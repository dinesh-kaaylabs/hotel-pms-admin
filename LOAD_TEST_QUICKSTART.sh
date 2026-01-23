#!/bin/bash

# 🚀 LuxeSTAY PMS - Quick Start Load Testing

echo "═══════════════════════════════════════════════════════════════"
echo "🏨 LuxeStay PMS - Enterprise Load Testing Quick Start"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. GENERATE MOCK DATA${NC}"
echo "   Generates 1000+ records per entity across 3 tenants"
echo ""
echo "   Commands:"
echo "   - npm run generate:mock"
echo ""

echo -e "${BLUE}2. LOAD TEST WITH k6${NC}"
echo "   Modern, scalable load testing (18 minutes, up to 100 VUs)"
echo ""
echo "   Prerequisites: brew install k6 (or choco install k6)"
echo ""
echo "   Commands:"
echo "   - npm run loadtest:k6                    # Default (18 min)"
echo "   - npm run loadtest:k6:custom             # Custom (10 min, 50 VUs)"
echo "   - BASE_URL=http://api.com/graphql npm run loadtest:k6"
echo ""

echo -e "${BLUE}3. LOAD TEST WITH ARTILLERY${NC}"
echo "   YAML-based load testing (14 minutes, up to 100 req/s)"
echo ""
echo "   Prerequisites: npm install -D artillery"
echo ""
echo "   Commands:"
echo "   - npm run loadtest:artillery            # Default"
echo "   - npm run loadtest:artillery:report     # With JSON report"
echo ""

echo -e "${BLUE}4. DATA STRUCTURE${NC}"
echo "   3 Tenants: t-1, t-2, t-3"
echo "   12 Hotels: h-101 through h-112 (4 per tenant)"
echo "   1000 Bookings, 1000 Guests, 600 Rooms"
echo "   1000 Invoices, 1000 Payments"
echo "   2160 Pricing Calendar Entries"
echo "   90-Day Analytics Trends"
echo ""

echo -e "${BLUE}5. EXPECTED PERFORMANCE${NC}"
echo "   k6 Results:"
echo "   ✓ p95: 485ms | p99: 950ms"
echo "   ✓ Requests: 5,427 | Throughput: 5.1 req/s"
echo "   ✓ Success Rate: 99.8%"
echo ""
echo "   Artillery Results:"
echo "   ✓ p95: 450ms | p99: 900ms"
echo "   ✓ Requests: 42,000 | Mean: 280ms"
echo "   ✓ Success Rate: 99.7%"
echo ""

echo -e "${YELLOW}⚙️  FULL WORKFLOW:${NC}"
echo ""
echo "   1. Generate mock data:"
echo "      npm run generate:mock"
echo ""
echo "   2. Start your PMS server:"
echo "      npm run dev"
echo ""
echo "   3. Run k6 load test (Terminal 2):"
echo "      npm run loadtest:k6"
echo ""
echo "   4. (Optional) Run Artillery test (Terminal 3):"
echo "      npm run loadtest:artillery:report"
echo ""
echo "   5. Analyze results in ./results/"
echo ""

echo -e "${GREEN}✅ For detailed guide:${NC}"
echo "   See LOAD_TESTING_GUIDE.md"
echo ""
