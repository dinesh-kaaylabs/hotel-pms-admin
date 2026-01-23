#!/usr/bin/env node

/**
 * 🚀 LUXESTAY PMS - Simple Node.js Load Test
 * 
 * Alternative to k6/Artillery - pure Node.js implementation
 * Perfect for CI/CD pipelines and environments where k6/Artillery can't be installed
 * 
 * Usage: node loadtest-node.js
 * Or with npm: npm run loadtest:node (if you add it to package.json)
 */

import http from 'http';
import https from 'https';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const DURATION_MINUTES = parseInt(process.env.DURATION || '5', 10);
const MAX_VUS = parseInt(process.env.MAX_VUS || '50', 10);
const TENANT_ID = process.env.TENANT_ID || 't-1';
const HOTEL_ID = process.env.HOTEL_ID || 'h-101';

// Metrics tracking
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalDuration: 0,
  responseTimes: [],
  errors: [],
  startTime: Date.now(),
};

// GraphQL Queries
const queries = {
  me: `query Me { me { id name email role } }`,
  listHotels: `query ListHotels { hotels { id name city } }`,
  listBookings: `query ListBookings { bookings(hotelId: "${HOTEL_ID}", limit: 50, offset: 0) { id bookingNumber status } }`,
  listGuests: `query ListGuests { guests(hotelId: "${HOTEL_ID}", limit: 50, offset: 0) { id name email } }`,
  dashboardStats: `query DashboardStats { dashboardStats(hotelId: "${HOTEL_ID}") { totalBookings occupancyRate } }`,
  listInvoices: `query ListInvoices { invoices(hotelId: "${HOTEL_ID}", limit: 50, offset: 0) { id invoiceNumber totalAmount } }`,
};

const queryNames = Object.keys(queries);

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeGraphQLRequest(queryName) {
  return new Promise((resolve, reject) => {
    const query = queries[queryName] || queries.listHotels;
    const payload = JSON.stringify({
      query,
      operationName: queryName,
    });

    const isHttps = BASE_URL.startsWith('https');
    const client = isHttps ? https : http;
    const url = new URL(BASE_URL.replace(/\/graphql$/, '') + '/graphql');

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'Authorization': `Bearer test-token-${TENANT_ID}`,
      },
    };

    const startTime = Date.now();
    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const duration = Date.now() - startTime;
        const success = res.statusCode === 200 && !data.includes('errors');

        metrics.totalRequests++;
        metrics.responseTimes.push(duration);
        metrics.totalDuration += duration;

        if (success) {
          metrics.successfulRequests++;
        } else {
          metrics.failedRequests++;
          metrics.errors.push({
            query: queryName,
            status: res.statusCode,
            message: data.substring(0, 100),
          });
        }

        resolve({
          statusCode: res.statusCode,
          duration,
          success,
          query: queryName,
        });
      });
    });

    req.on('error', (e) => {
      metrics.totalRequests++;
      metrics.failedRequests++;
      metrics.errors.push({
        query: queryName,
        error: e.message,
      });
      reject(e);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      metrics.failedRequests++;
      metrics.errors.push({
        query: queryName,
        error: 'Timeout',
      });
      reject(new Error('Request timeout'));
    });

    req.write(payload);
    req.end();
  });
}

function calculatePercentile(arr, percentile) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

async function runWorker(workerId, duration) {
  const endTime = Date.now() + duration;

  while (Date.now() < endTime) {
    const query = randomItem(queryNames);

    try {
      await makeGraphQLRequest(query);
    } catch (e) {
      // Error already tracked in metrics
    }

    // Think time between requests (0.5-2 seconds)
    const thinkTime = Math.random() * 1500 + 500;
    await new Promise((resolve) => setTimeout(resolve, thinkTime));
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  🚀 LuxeStay PMS - Node.js GraphQL Load Test              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📊 Test Configuration:');
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Tenant: ${TENANT_ID}`);
  console.log(`   Hotel: ${HOTEL_ID}`);
  console.log(`   Duration: ${DURATION_MINUTES} minute(s)`);
  console.log(`   Max Concurrent Users: ${MAX_VUS}\n`);

  console.log('🔄 Starting load test...\n');

  const testDuration = DURATION_MINUTES * 60 * 1000;
  const vuRampUpDuration = Math.min(testDuration / 4, 60000); // Ramp up VUs over 1/4 of test or 60s
  const step = Math.ceil(MAX_VUS / (vuRampUpDuration / 1000));

  const workers = [];
  let currentVUs = 0;
  const rampUpStartTime = Date.now();

  // Ramp up VUs gradually
  const rampUpInterval = setInterval(() => {
    const elapsed = Date.now() - rampUpStartTime;

    if (elapsed >= vuRampUpDuration) {
      currentVUs = MAX_VUS;
      clearInterval(rampUpInterval);
      console.log(`✅ Ramped up to ${MAX_VUS} VUs\n`);
    } else {
      const targetVUs = Math.min(currentVUs + step, MAX_VUS);
      const newVUs = targetVUs - currentVUs;

      for (let i = 0; i < newVUs; i++) {
        workers.push(
          runWorker(`worker-${currentVUs + i}`, testDuration - elapsed).catch(() => {
            // Worker completed or errored
          })
        );
      }

      currentVUs = targetVUs;
      const percentage = Math.round((elapsed / vuRampUpDuration) * 100);
      console.log(`⬆️  Ramping up VUs: ${currentVUs}/${MAX_VUS} (${percentage}%)`);
    }
  }, 1000);

  // Progress updates every 10 seconds
  const progressInterval = setInterval(() => {
    const elapsed = Date.now() - metrics.startTime;
    const rps = (metrics.totalRequests / (elapsed / 1000)).toFixed(2);
    const successRate = (
      (metrics.successfulRequests / metrics.totalRequests) *
      100
    ).toFixed(2);
    const avgDuration = (metrics.totalDuration / metrics.totalRequests).toFixed(2);

    console.log(
      `📈 Progress: ${metrics.totalRequests} reqs | RPS: ${rps} | Success: ${successRate}% | Avg: ${avgDuration}ms | VUs: ${currentVUs}`
    );
  }, 10000);

  // Wait for all workers to complete
  await Promise.all(workers);
  clearInterval(rampUpInterval);
  clearInterval(progressInterval);

  // Calculate final metrics
  const totalDuration = (Date.now() - metrics.startTime) / 1000;
  const avgResponseTime = (metrics.totalDuration / metrics.totalRequests).toFixed(2);
  const minResponseTime = Math.min(...metrics.responseTimes);
  const maxResponseTime = Math.max(...metrics.responseTimes);
  const p50 = calculatePercentile(metrics.responseTimes, 50).toFixed(2);
  const p95 = calculatePercentile(metrics.responseTimes, 95).toFixed(2);
  const p99 = calculatePercentile(metrics.responseTimes, 99).toFixed(2);
  const rps = (metrics.totalRequests / totalDuration).toFixed(2);
  const successRate = ((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(2);

  // Print results
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  📊 Load Test Results                                      ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📌 Summary:');
  console.log(`   Total Duration: ${totalDuration.toFixed(2)}s`);
  console.log(`   Total Requests: ${metrics.totalRequests}`);
  console.log(`   Requests per Second: ${rps}`);
  console.log(`   Success Rate: ${successRate}%\n`);

  console.log('⏱️  Response Times (ms):');
  console.log(`   Min: ${minResponseTime}`);
  console.log(`   Max: ${maxResponseTime}`);
  console.log(`   Avg: ${avgResponseTime}`);
  console.log(`   p50: ${p50}`);
  console.log(`   p95: ${p95}`);
  console.log(`   p99: ${p99}\n`);

  console.log('✅ Successful Requests:', metrics.successfulRequests);
  console.log('❌ Failed Requests:', metrics.failedRequests);

  if (metrics.errors.length > 0) {
    console.log('\n⚠️  Recent Errors:');
    metrics.errors.slice(0, 5).forEach((err, idx) => {
      console.log(`   ${idx + 1}. ${err.query}: ${err.error || err.message || err.status}`);
    });
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log(`║  ✨ Test Complete!                                          ║`);
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Exit with appropriate code
  process.exit(metrics.failedRequests > metrics.totalRequests * 0.1 ? 1 : 0);
}

// Run the test
main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
