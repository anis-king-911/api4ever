const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const type = req.query.type ? req.query.type.toLowerCase() : null;
  const state = req.query.state ? req.query.state.toLowerCase() : null;

  let limit = req.query.limit ? Number(req.query.limit) : null;
  let page = req.query.page ? Number(req.query.page) : null;
  
  const { MainList } = require('../data/MainList.json');

  if(!type && !state && !limit && !page) {
    res.send(MainList['MainList'])
  }
  
  if(type && state && !limit && !page) {
    const snapshot = Object.entries(MainList['MainList']).filter(([key, val]) => {
      return val['Type'].toLowerCase() === type;
    }).filter(([key, val]) => {
      return val['State'].toLowerCase() === state;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }
  
  if(type && !state && !limit && !page) {
    const snapshot = Object.entries(MainList['MainList']).filter(([key, val]) => {
      return val['Type'].toLowerCase() === type;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }
  
  if (!type && state && !limit && !page) {
    const snapshot = Object.entries(MainList['MainList']).filter(([key, val]) => {
      return val['State'].toLowerCase() === state;
    });
    
    const reObject = Object.fromEntries(snapshot);
    res.send(reObject);
  }

  if(limit && page) {
    const allPages = [];
    const snapshot = Object.entries(MainList['MainList']);
    const snapSize = snapshot.length;
    const snapPages = Math.ceil(snapSize / limit);

    for (let index = 0; index < snapPages; index++) {
      allPages.push({
        from: Number(index * limit),
        to: Number( (index+1) * limit)
      })
    }

    const newSnapshot = snapshot.slice(allPages[page - 1].from, allPages[page - 1].to);
    const reObject = {
      details: {
        limit: limit,
        currentPage: page,
        totalPages: snapPages,
        nextPage: page === snapPages ? false : true,
        prevPage: page <= 1 ? false : true,
      },
      content: Object.fromEntries(newSnapshot)
    };

    res.send(reObject);
  }
  
  if( (!limit && page) || (limit && !page)) {
    limit = limit ? limit : 5;
    page = page ? page : 1;
    const allPages = [];
    const snapshot = Object.entries(MainList['MainList']);
    const snapSize = snapshot.length;
    const snapPages = Math.ceil(snapSize / limit);

    for (let index = 0; index < snapPages; index++) {
      allPages.push({
        from: Number(index * limit),
        to: Number( (index+1) * limit)
      })
    }

    const newSnapshot = snapshot.slice(allPages[page - 1].from, allPages[page - 1].to);
    const reObject = {
      head: {
        limit: limit,
        currentPage: page,
        totalPages: snapPages,
        nextPage: page === snapPages ? false : true,
        prevPage: page <= 1 ? false : true,
      },
      body: Object.fromEntries(newSnapshot)
    };

    res.send(reObject);
  }
  
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  const { MainList } = require('../data/MainList.json');
  const snapshot = Object.entries(MainList['MainList']);
  const WantedManga = snapshot.filter(([key, val]) => val['ID'] === id);

  const Case = WantedManga && WantedManga.length !== 0 ? Object.fromEntries(WantedManga) : ["nothing add yet"];
  res.send(Case);
});

router.get('/:id/volume', (req, res) => {
  const id = Number(req.params.id);

  const { MainList } = require('../data/MainList.json');
  const { CoversList } = require('../data/CoversList.json');

  const mangaSnapshot = Object.values(MainList['MainList']);
  const volumeSnapshot = Object.entries(CoversList['CoversList']);
  const WantedManga = mangaSnapshot.find(val => val['ID'] === id);
  const WantedVolume = volumeSnapshot.filter(([key, val]) => val['Title'] === WantedManga['Title']);

  const Case = WantedVolume.length !== 0 ? Object.fromEntries(WantedVolume) : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;