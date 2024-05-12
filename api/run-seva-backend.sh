#!/bin/bash
  
# Define the API endpoint and expected response code
API_URL="http://localhost:8090/"  # Replace with your actual API URL
EXPECTED_CODE="200"

# Check if the API is responding with the expected code
response=$(curl -s -o /dev/null -w "%{http_code}"  "$API_URL")

if [[ "$response" == "$EXPECTED_CODE" ]]; then
  echo "Seva API running"
else
  # Start the API if not running
  cd ../seva-backend;
  ~/.nvm/versions/node/v18.16.0/bin/node dist/server.js > ../seva-backend.log 2> ../seva-backend-error.log;
  echo "Seva API started";
fi