const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`Server started on port: ${PORT}`);
});