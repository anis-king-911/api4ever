const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const { CoversList } = require('../data/CoversList.json');
  res.send(CoversList);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const { CoversList } = require('../data/CoversList.json');
  const snapshot = Object.entries(CoversList);
  const WantedVolume = snapshot.filter(([key, val]) => val['ID'] === id);

  const Case = WantedVolume && WantedVolume.length !== 0 ? Object.fromEntries(WantedVolume) : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;