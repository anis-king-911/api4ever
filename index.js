const express = require('express');
const app = express();
const port = 7700;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const { data } = require('./manga4ever.js');

app.get('/', (req, res) => {
  res.send(data);
})

app.get('/manga', (req, res) => {
  res.send(data['MangaList']);
})

app.get('/manga/:title', (req, res) => {
  const title = req.params.title;
  const type = req.query.type;

  const snapshot = Object.entries(data['VolumeList']);
  const wantedByTitle = snapshot.filter(([ key, item ]) => item['Title'] === title);
  const wantedByType = wantedByTitle.filter(([ key, item ]) => item['Type'] = type);

  res.send(wantedByType);
})

app.get('/volume', (req, res) => {
  res.send(data['VolumeList']);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})