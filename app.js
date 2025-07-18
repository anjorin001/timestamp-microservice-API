const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

// Upload handler
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
