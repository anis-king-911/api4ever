const express = require('express');
const path = require('path');
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
    ],
    "filter": {
      "all": [
        "https://api4ever.vercel.app/manga?state=[state]&type=[type]",
        "https://api4ever.vercel.app/manga?type=[type]&state=[state]",
      ],
      "state": [
        "https://api4ever.vercel.app/manga?state=publishing",
        "https://api4ever.vercel.app/manga?state=finished",
        "https://api4ever.vercel.app/manga?state=on%20hiatus",
        "https://api4ever.vercel.app/manga?state=discontinued",
      ],
      "type": [
        "https://api4ever.vercel.app/manga?type=manga",
        "https://api4ever.vercel.app/manga?type=light%20novel",
        "https://api4ever.vercel.app/manga?type=one%20shot",
      ]
    },
    "pagination": {
      "normal": [
        "https://api4ever.vercel.app/manga?limit=[Number]&page=[Number]",
        "https://api4ever.vercel.app/manga?page=[Number]&limit=[Number]"
      ],
      "by default": {
        "limit": 5,
        "page": 1
      },
    }
  },
  "volume": {
    "all": "https://api4ever.vercel.app/volume",
    "one": ["https://api4ever.vercel.app/volume/[id]"],

    "pagination": {
      "normal": [
        "https://api4ever.vercel.app/volume?limit=[Number]&page=[Number]",
        "https://api4ever.vercel.app/volume?page=[Number]&limit=[Number]"
      ],
      "by default": {
        "limit": 10,
        "page": 1
      },
    }
  },
  "titles": "https://api4ever.vercel.app/titles",
  "magazines": "https://api4ever.vercel.app/magazines"
};

const localMain = {
  "manga": "http://localhost:7700/manga",
  "volume": "http://localhost:7700/volume",
  "titles": "http://localhost:7700/titles",
  "magazines": "http://localhost:7700/magazines"
};

/* app.use("/assets", express.static(path.resolve(__dirname, "views", "assets")));

const ViewsRoutes = require('./routes/views.js');
app.use('/', ViewsRoutes); */


app.get('/', async (req, res) => {
  //res.send(localMain);
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

app.get('/magazines', (req, res) => {
  const { Magazines } = require('./data/magazines.js');
  res.send(Magazines);
});

app.listen(port, () => {
  console.log(`runing on http://localhost:${port}`);
});
