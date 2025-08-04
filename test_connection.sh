#!/bin/bash
# Test script for frontend-backend connection

echo "🧪 Testing Frontend-Backend Connection"
echo "======================================"
echo "Frontend: https://naac-omega.vercel.app/"
echo "Backend:  https://naac-0dgf.onrender.com"
echo "Backend IPs: 18.156.158.53, 18.156.42.200, 52.59.103.54"
echo ""

# Test backend health
echo "🔍 Testing backend health..."
echo "GET https://naac-0dgf.onrender.com/"
curl -s https://naac-0dgf.onrender.com/ | head -c 200 || echo "❌ Backend root not responding"
echo ""

echo "GET https://naac-0dgf.onrender.com/health"
curl -s https://naac-0dgf.onrender.com/health | head -c 200 || echo "❌ Health endpoint not responding"
echo ""

echo "GET https://naac-0dgf.onrender.com/api/health/services"
curl -s https://naac-0dgf.onrender.com/api/health/services | head -c 200 || echo "❌ API services not responding"
echo ""

echo "✅ Backend tests complete"
echo ""
echo "📋 Production URLs:"
echo "Frontend: https://naac-omega.vercel.app/"
echo "Backend:  https://naac-0dgf.onrender.com"
echo ""
echo "� Local development:"
echo "1. Start backend: python main.py"
echo "2. Start frontend: cd naac-frontend && npm start"
echo "3. Open http://localhost:3000"
