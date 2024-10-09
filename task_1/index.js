const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

let latestFilePath = null; // Store the path of the latest uploaded file

// API 1: Upload the Excel file
app.post("/upload", upload.single("report"), (req, res) => {
  if (!req.file || path.extname(req.file.originalname) !== ".xlsx") {
    return res
      .status(400)
      .send("Invalid file format. Please upload an .xlsx file.");
  }
  latestFilePath = req.file.path; // Save the path of the uploaded file
  res.status(200).send("File uploaded successfully.");
});

// Helper function to calculate the total
const calculateTotal = (data, startTime, endTime) => {
  let total = 0;

  data.forEach((row) => {
    const time = moment(row["Time"], "HH:mm:ss");
    if (
      time.isBetween(
        moment(startTime, "HH:mm"),
        moment(endTime, "HH:mm"),
        null,
        "[]"
      )
    ) {
      total += parseFloat(row["Total"]);
    }
  });

  return total;
};

// API 2: Query data based on start time and end time
app.get("/query", (req, res) => {
  const { startTime, endTime } = req.query;

  if (!latestFilePath) {
    return res.status(400).send("No file uploaded yet.");
  }
  if (
    !startTime ||
    !endTime ||
    !moment(startTime, "HH:mm", true).isValid() ||
    !moment(endTime, "HH:mm", true).isValid()
  ) {
    return res
      .status(400)
      .send("Invalid time format. Please provide time in HH:mm format.");
  }

  try {
    // Read the uploaded Excel file
    const workbook = XLSX.readFile(latestFilePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Calculate the total based on the time range
    const total = calculateTotal(jsonData, startTime, endTime);
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).send("Error processing the file.");
  }
});

// API to handle invalid endpoints
app.use((req, res) => {
  res.status(404).send("Endpoint not found.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
