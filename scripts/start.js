const fs = require('fs');
const path = require('path');
const express = require('express');
const reload = require('reload');

const app = express();
const PORT = 3000;

const rootDir = path.join(__dirname, '../');
const pagesDir = path.join(rootDir, 'static/pages');

app.use(express.static('./static'));
app.use('/auth', express.static(path.join(pagesDir, 'auth')));
app.use('/404', express.static(path.join(pagesDir, '404')));
app.use('/500', express.static(path.join(pagesDir, '500')));
app.use('/chats', express.static(path.join(pagesDir, 'chats')));
app.use('/settings', express.static(path.join(pagesDir, 'settings')));
app.use('/signin', express.static(path.join(pagesDir, 'signin')));
app.use('/fontawesome', express.static(path.join(rootDir, 'node_modules/@fortawesome/fontawesome-free/')));

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