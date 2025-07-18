const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Request Header Parser Microservice");
});

// ✅ Main endpoint
app.get("/api/whoami", (req, res) => {
  const ipaddress =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  const language = req.headers["accept-language"]; // ← This line is correct
  const software = req.headers["user-agent"]; // ← This line is correct

  res.json({
    ipaddress,
    language,
    software,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
