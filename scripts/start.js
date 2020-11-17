const fs = require('fs');
const express = require('express');
const reload = require('reload');

const app = express();
const PORT = 3000;

app.use(express.static('./static'));

const liveReload = (path) => reload(app)
  .then(({ reload }) => {
    fs.watch(path, { recursive: true }, () => {
      console.log('Server reloading...');
      reload();
    });
  });

app.listen(PORT, function () {
  console.log(`Server started on port: ${PORT}`);
  liveReload('./static');
});