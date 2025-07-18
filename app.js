const express = require('express');
const app = express();

// Enable CORS for FCC testing
const cors = require('cors');
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Timestamp API route
app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  // Check if it's a number (UNIX timestamp)
  const date = !isNaN(dateParam)
    ? new Date(Number(dateParam))
    : new Date(dateParam);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
