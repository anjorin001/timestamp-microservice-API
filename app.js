const express = require("express");
const cors = require("cors");
const dns = require("dns");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static(`${__dirname}/public`));

// Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

let urlDatabase = {};
let urlCounter = 1;

// ✅ POST to shorten a URL
app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  try {
    const urlObj = new URL(originalUrl);

    // Validate using dns.lookup
    dns.lookup(urlObj.hostname, (err) => {
      if (err) return res.json({ error: "invalid url" });

      const shortUrl = urlCounter++;
      urlDatabase[shortUrl] = originalUrl;

      res.json({
        original_url: originalUrl,
        short_url: shortUrl,
      });
    });
  } catch (error) {
    res.json({ error: "invalid url" });
  }
});

// ✅ Redirect to original URL
app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
