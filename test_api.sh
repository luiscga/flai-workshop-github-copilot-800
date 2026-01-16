#!/bin/bash

# Test Octofit API Endpoints
CODESPACE_NAME="${CODESPACE_NAME:-upgraded-space-doodle-r94v65x79gv2vpp}"
BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"

echo "Testing Octofit Tracker API Endpoints"
echo "======================================"
echo "Base URL: $BASE_URL"
echo ""

# Test API root
echo "1. Testing API Root: ${BASE_URL}/api/"
curl -s "${BASE_URL}/api/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/"
echo ""
echo ""

# Test activities endpoint
echo "2. Testing Activities Endpoint: ${BASE_URL}/api/activities/"
curl -s "${BASE_URL}/api/activities/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/activities/"
echo ""
echo ""

# Test users endpoint
echo "3. Testing Users Endpoint: ${BASE_URL}/api/users/"
curl -s "${BASE_URL}/api/users/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/users/"
echo ""
echo ""

# Test teams endpoint
echo "4. Testing Teams Endpoint: ${BASE_URL}/api/teams/"
curl -s "${BASE_URL}/api/teams/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/teams/"
echo ""
echo ""

# Test leaderboard endpoint
echo "5. Testing Leaderboard Endpoint: ${BASE_URL}/api/leaderboard/"
curl -s "${BASE_URL}/api/leaderboard/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/leaderboard/"
echo ""
echo ""

# Test workouts endpoint
echo "6. Testing Workouts Endpoint: ${BASE_URL}/api/workouts/"
curl -s "${BASE_URL}/api/workouts/" | jq '.' 2>/dev/null || curl -s "${BASE_URL}/api/workouts/"
echo ""
