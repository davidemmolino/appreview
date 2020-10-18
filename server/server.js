// npm installed express, require it in
const express = require('express');
// using app for eventual routing
const app = express();
// port runs on 3333
const PORT = 3333;
const path = require('path');
const routes = require('./routes.js');

app.use(express.json());

// Parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true}));

app.use(express.static('assets'));

app.use('/secret', (req, res) => {
  res
  .status(200)
  .set('Content-Type', 'text/html')
  .sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
})

app.use((req, res) => {
  res.status(404).json('Error: not found');
  // another way!
  // res.sendStatus(404);
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})


// may or may not use this
module.exports = app;