const axios = require("axios");
const urlInput = "https://test-share.shub.edu.vn/api/intern-test/input";
const urlOutput = "https://test-share.shub.edu.vn/api/intern-test/output";

// Step 1: Fetch data from the API
async function fetchData() {
  const response = await axios.get(urlInput).then((response) => response.data);
  return response;
}

// Step 2: Preprocess the data
function preprocessData(data) {
  const n = data.length;
  const prefixSum = new Array(n + 1).fill(0);
  const evenPrefixSum = new Array(n + 1).fill(0);
  const oddPrefixSum = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + data[i];
    if (i % 2 === 0) {
      evenPrefixSum[i + 1] = evenPrefixSum[i] + data[i];
      oddPrefixSum[i + 1] = oddPrefixSum[i];
    } else {
      evenPrefixSum[i + 1] = evenPrefixSum[i];
      oddPrefixSum[i + 1] = oddPrefixSum[i] + data[i];
    }
  }

  return { prefixSum, evenPrefixSum, oddPrefixSum };
}

// Step 3: Process queries
function processQueries(queries, prefixSum, evenPrefixSum, oddPrefixSum) {
  const results = [];

  for (const query of queries) {
    const [l, r] = query.range;
    if (query.type === "1") {
      // Sum query
      const totalSum = prefixSum[r + 1] - prefixSum[l];
      results.push(totalSum);
    } else if (query.type === "2") {
      // Alternating sum query
      const evenSum = evenPrefixSum[r + 1] - evenPrefixSum[l];
      const oddSum = oddPrefixSum[r + 1] - oddPrefixSum[l];
      const alternatingSum = evenSum - oddSum;
      results.push(alternatingSum);
    }
  }

  return results;
}

// Step 4: Send results back to the API
async function sendResults(token, results) {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.post(urlOutput, results, { headers });
  return response.data;
}

async function main() {
  try {
    // Step 1: Fetch data
    const inputData = await fetchData();
    const token = inputData.token;
    const data = inputData.data;
    const queries = inputData.query;

    // Step 2: Preprocess data
    const { prefixSum, evenPrefixSum, oddPrefixSum } = preprocessData(data);

    // Step 3: Process queries
    const results = processQueries(
      queries,
      prefixSum,
      evenPrefixSum,
      oddPrefixSum
    );

    // Step 4: Send results back to the API
    console.log("Results:", results);
    const response = await sendResults(token, results);
    console.log(response);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
