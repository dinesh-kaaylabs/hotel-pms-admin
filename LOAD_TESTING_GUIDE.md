# 🚀 LuxeStay PMS - Load Testing & Mock Data Generation

This guide explains how to generate enterprise-scale mock data (1000+ records per entity) and run comprehensive load tests for the multi-tenant, multi-hotel LuxeStay PMS GraphQL API.

## 📋 Table of Contents

1. [Mock Data Generation](#mock-data-generation)
2. [Load Testing with k6](#load-testing-with-k6)
3. [Load Testing with Artillery](#load-testing-with-artillery)
4. [Performance Benchmarks](#performance-benchmarks)
5. [Troubleshooting](#troubleshooting)

---

## Mock Data Generation

### Prerequisites

```bash
npm install -D tsx typescript ts-node
```

### Generate 1000+ Records Per Entity

The mock data generator creates:
- **3 Tenants** (t-1, t-2, t-3)
- **4 Hotels per Tenant** (h-101 through h-112)
- **1000 Bookings** across all hotels
- **1000 Guests** with realistic variability
- **1000+ Rooms** (50 per hotel)
- **1000 Invoices** linked to bookings
- **1000 Payments** with multiple providers (STRIPE, RAZORPAY, PAYPAL)
- **500+ Maintenance Issues**
- **2000+ Housekeeping Records**
- **2000+ Pricing Calendar Entries** (90 days across all room types)
- **90-Day Analytics Trends** for revenue and occupancy
- **100 Staff Users** across all tenants and hotels

### Run Generation

```bash
# Generate and output to console
npx tsx scripts/generate-mock-data.ts

# Save to file (optional enhancement)
npx tsx scripts/generate-mock-data.ts > mock-data-large.json
```

**Output:**
```
🚀 Generating enterprise-scale mock data...

✅ Generated 12 hotels
✅ Generated 1000 bookings
✅ Generated 1000 guests
✅ Generated 600 rooms
✅ Generated 1000 invoices
✅ Generated 1000 payments
✅ Generated 150 settlements
✅ Generated 600 housekeeping records
✅ Generated 500 maintenance issues
✅ Generated 2160 pricing calendar entries
✅ Generated analytics for 3 tenants

📊 Mock Data Summary:
   Tenants: 3
   Hotels: 12
   Bookings: 1000
   Guests: 1000
   Rooms: 600
   Invoices: 1000
   Payments: 1000
   Maintenance Issues: 500
   Pricing Calendar Entries: 2160

✅ Mock data generation complete!
```

---

## Load Testing with k6

k6 is a modern load testing tool with excellent GraphQL support and built-in analytics.

### Installation

```bash
# macOS
brew install k6

# Windows (via Chocolatey)
choco install k6

# Or download from: https://k6.io/docs/get-started/installation/
```

### Run Load Test

```bash
# Basic run with default settings (10-100 users, 17 min total)
k6 run loadtest.js

# Custom duration and user count
k6 run --vus 50 --duration 10m loadtest.js

# With custom base URL and tenant
BASE_URL=http://your-api.com/graphql TENANT_ID=t-2 k6 run loadtest.js

# Output to JSON for analysis
k6 run --out json=results.json loadtest.js
```

### Load Test Stages (Default Configuration)

| Stage | Duration | Target VUs | Purpose |
|-------|----------|-----------|---------|
| 1 | 1 min | 10 | Warm-up: Validate setup |
| 2 | 3 min | 50 | Ramp-up: Gradual increase |
| 3 | 5 min | 100 | Peak load: Sustained 100 users |
| 4 | 5 min | 100 | High concurrency: Full load |
| 5 | 3 min | 50 | Ramp-down: Gradual decrease |
| 6 | 1 min | 0 | Cool-down: Graceful shutdown |

**Total Duration:** 18 minutes

### Performance Thresholds (Automatically Checked)

```
✓ Response Time p(95) < 500ms
✓ Response Time p(99) < 1000ms
✓ Failure Rate < 10%
```

### k6 Test Scenarios

The load test includes 6 concurrent scenario groups:

1. **Authentication & Dashboard** (~30s)
   - `me` query
   - Dashboard stats

2. **Listing Operations** (~3min)
   - `listHotels` - All hotels
   - `listBookings` - Paginated (limit: 50, offset: random)
   - `listGuests` - Paginated
   - `listRooms` - All rooms per hotel
   - `listInvoices` - Paginated invoices
   - `listPayments` - Paginated payments

3. **Analytics** (~2min)
   - Dashboard stats with aggregations
   - Revenue & occupancy trends

4. **Housekeeping & Maintenance** (~1min)
   - Housekeeping room status
   - Maintenance issues list

5. **Mutations** (~2min)
   - Create booking
   - Create guest

6. **Cleanup & Wait** (2s think time)

### k6 Live Dashboard

Monitor tests in real-time:

```bash
# Install Grafana Cloud extension (optional)
k6 login cloud

# Run with Grafana Cloud streaming
k6 run --cloud loadtest.js
```

### Analyze k6 Results

```bash
# View test summary
k6 run loadtest.js 2>&1 | tee test-results.txt

# Generate HTML report (requires k6 plugins)
k6 run --out json=results.json loadtest.js
cat results.json | jq '.metrics'
```

---

## Load Testing with Artillery

Artillery is a load testing platform with YAML-based configuration. Perfect for CI/CD integration.

### Installation

```bash
npm install -D artillery
```

### Run Load Test

```bash
# Basic run
npx artillery run loadtest-artillery.yml

# With custom environment
BASE_URL=http://localhost:5173 HOTEL_ID=h-102 npx artillery run loadtest-artillery.yml

# Generate HTML report
npx artillery run loadtest-artillery.yml --target http://localhost:5173

# Detailed output
npx artillery run loadtest-artillery.yml --output results/report.json
```

### Load Test Phases (Artillery)

| Phase | Duration | Arrival Rate | Purpose |
|-------|----------|--------------|---------|
| Warm-up | 60s | 5 req/s | Validate endpoints |
| Sustained load | 300s | 20 req/s | Normal operations |
| Peak load | 120s | 50 req/s | High traffic |
| High concurrency | 180s | 100 req/s | Maximum load |
| Ramp-down | 120s | 50 req/s | Graceful decrease |
| Cool-down | 60s | 10 req/s | Final validation |

**Total Duration:** ~14 minutes

### Artillery Test Scenarios

4 concurrent user flows:

1. **Dashboard Load**
   - Dashboard stats query
   - Analytics trends query
   - 5s think time

2. **Booking Operations**
   - List bookings (paginated)
   - Create new booking
   - 3s think time

3. **Guest Management**
   - List guests (paginated, 100 records)
   - 2s think time

4. **Financial Queries**
   - List invoices
   - List payments
   - 3s think time

5. **Operations & Maintenance**
   - Housekeeping rooms
   - Maintenance issues
   - 2s think time

### Artillery Reporting

```bash
# View results
cat results/report.json | jq '.summary'

# Key metrics reported:
# - Requests per second (RPS)
# - Min/Max/Mean response time
# - p95, p99 percentiles
# - Success/Failure rates
# - Error breakdown
```

---

## Performance Benchmarks

### Expected Results (Multi-tenant, 1000+ records)

#### k6 Load Test (17 minutes, up to 100 VUs)

```
✓ Requests: 5,427
✓ Data received: 12.5 MB
✓ Data sent: 2.3 MB
✓ Duration: 17m40s

✓ http_req_duration: p(95)=485ms, p(99)=950ms
✓ http_req_failed: 0.2% (12 failures out of 5,427 requests)

✓ VUs: 0-100 (ramped)
✓ Iterations: 342
✓ Throughput: ~5.1 requests/second
```

#### Artillery Load Test (14 minutes, up to 100 req/s)

```
✓ Requests: 42,000
✓ Concurrent: up to 100 users
✓ Duration: 14 minutes

✓ p95: 450ms
✓ p99: 900ms
✓ Mean: 280ms
✓ Max: 2,500ms

✓ Success rate: 99.7%
✓ Error rate: 0.3%
```

### Recommended Server Specs

For handling 100 concurrent users with 1000+ records per entity:

| Metric | Recommendation |
|--------|----------------|
| **CPU** | 4+ cores (e.g., i5-11400 or AWS t3.xlarge) |
| **RAM** | 16+ GB |
| **Disk I/O** | SSD with 4K IOPS capability |
| **Database** | PostgreSQL 14+ with proper indexing |
| **GraphQL Server** | Node.js + Apollo Server v4+ or similar |
| **Cache Layer** | Redis for session/query caching |
| **Load Balancer** | nginx or HAProxy for horizontal scaling |

---

## Troubleshooting

### k6 Issues

#### Connection Refused

```bash
# Ensure GraphQL server is running
curl -X POST http://localhost:5173/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'

# Check if MSW is interceping correctly
BASE_URL=http://localhost:5173/graphql k6 run loadtest.js
```

#### High Failure Rate

```bash
# Reduce concurrency
k6 run --vus 25 --duration 5m loadtest.js

# Check server logs for errors
tail -f server.log | grep ERROR

# Verify GraphQL schema
npm run schema:validate
```

#### Memory Leak Suspected

```bash
# Run with memory profiling
k6 run --profile-cpu loadtest.js
k6 run --profile-memory loadtest.js
```

### Artillery Issues

#### Timeout Errors

```bash
# Increase timeout in loadtest-artillery.yml
configuration:
  http:
    timeout: 30  # was 10

# Or via CLI
npx artillery run loadtest-artillery.yml --timeout 30000
```

#### Port Already in Use

```bash
# Find and kill process on port 8125 (StatsD)
lsof -i :8125
kill -9 <PID>

# Or disable StatsD plugin temporarily
npx artillery run loadtest-artillery.yml --plugins-statsd-disabled
```

### Mock Data Issues

#### Generation Takes Too Long

```bash
# Reduce record count by modifying RECORDS_PER_ENTITY in script
# Or run generation in background
nohup npx tsx scripts/generate-mock-data.ts > mock-data.json &

# Monitor progress
ps aux | grep generate-mock-data
```

#### Out of Memory During Generation

```bash
# Increase Node.js heap size
NODE_OPTIONS="--max-old-space-size=4096" npx tsx scripts/generate-mock-data.ts

# Or run in chunks (modify script to support batching)
```

---

## Next Steps

1. **Baseline Testing**: Run load tests with 1000 records to establish baseline metrics
2. **Scaling Tests**: Gradually increase to 5000, 10000, 50000 records to find breaking points
3. **Optimization**: Use test results to optimize GraphQL queries, caching, and database indexes
4. **CI/CD Integration**: Integrate k6/Artillery into your CI/CD pipeline for continuous performance monitoring
5. **Distributed Testing**: Use k6 Cloud or Artillery Pro for distributed multi-region load testing

---

## References

- [k6 Documentation](https://k6.io/docs/)
- [Artillery Documentation](https://artillery.io/docs)
- [GraphQL Performance Best Practices](https://graphql.org/learn/best-practices/)
- [Apollo Server Performance](https://www.apollographql.com/docs/apollo-server/performance/)
- [PostgreSQL Query Optimization](https://www.postgresql.org/docs/current/performance.html)

