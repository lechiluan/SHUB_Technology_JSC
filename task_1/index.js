const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Create a unique filename with an increasing sequence if necessary
    const baseName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    let newFileName = file.originalname;
    let counter = 1;

    // Check for existing files and rename accordingly
    while (fs.existsSync(path.join("uploads", newFileName))) {
      newFileName = `${baseName}_${counter++}${ext}`; // Increment file name
    }

    cb(null, newFileName);
  },
});
const upload = multer({ storage });

let latestFilePath = null;

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

// Helper function to calculate the total based on the time range
const calculateTotal = (data, startTime, endTime) => {
  let total = 0;

  data.forEach((row) => {
    // __EMPTY_1 is column "Giờ"
    // __EMPTY_7 is column "Thành tiền (VNĐ)"

    const time = moment(row["__EMPTY_1"], "HH:mm:ss");
    if (
      time.isBetween(
        moment(startTime, "HH:mm"),
        moment(endTime, "HH:mm"),
        null,
        "[]"
      )
    ) {
      total += parseFloat(row["__EMPTY_7"]); // Assuming the price is in the 7th column
    }
  });

  return total;
};

// API 2: Query data based on start time and end time
app.get("/query", (req, res) => {
  const { startTime, endTime } = req.query;

  // Check for the latest uploaded file
  const files = fs.readdirSync("uploads/");
  if (files.length === 0) {
    return res.status(400).send("No file uploaded yet.");
  }

  // Get the most recently uploaded file
  latestFilePath = path.join("uploads", files.sort().pop());

  // Validate startTime and endTime
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
    console.error("Error processing the file:", error);
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
