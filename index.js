const express = require('express');
const app = express();
const port = 7700;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const main = {
  "manga": {
    "all": "https://api4ever.vercel.app/manga",
    "one": [
      "https://api4ever.vercel.app/manga/[id]",
      "https://api4ever.vercel.app/manga/[id]/volume"
    ]
  },
  "volume": {
    "all": "https://api4ever.vercel.app/volume",
    "one": ["https://api4ever.vercel.app/volume/[id]"]
  },
  "titles": "https://api4ever.vercel.app/titles"
};

const localMain = {
  "manga": "http://localhost:7700/manga",
  "volume": "http://localhost:7700/volume",
  "titles": "http://localhost:7700/titles"
};


app.get('/', (req, res) => {
  res.send(main);
});

const MangaRoutes = require('./routes/manga.js');
app.use('/manga', MangaRoutes);

const VolumeRoutes = require('./routes/volume.js');
app.use('/volume', VolumeRoutes);

app.get('/titles', (req, res) => {
  const { Titles } = require('./data/titles.js');
  res.send(Titles);
});

app.listen(port, () => {
  console.log(`runing on http://localhost:${port}`);
});