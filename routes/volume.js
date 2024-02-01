const express = require('express');
const router = express();

router.get('/', (req, res) => {
  const { CoversList } = require('../data/CoversList.json');
  //res.send(CoversList);
  let limit = req.query.limit ? Number(req.query.limit) : null;
  let page = req.query.page ? Number(req.query.page) : null;

  if(limit && page) {
    const allPages = [];
    const snapshot = Object.entries(CoversList);
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
  
  if((!limit && page) || (limit && !page) || (!limit && !page)) {

    limit = limit ? limit : 10;
    page = page ? page : 1;
    
    const allPages = [];
    const snapshot = Object.entries(CoversList);
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

  const { CoversList } = require('../data/CoversList.json');
  const snapshot = Object.values(CoversList);
  const WantedVolume = snapshot.filter(val => val['ID'] === id);

  const Case = WantedVolume && WantedVolume.length !== 0 ? WantedVolume /*Object.fromEntries(WantedVolume)*/ : ["nothing add yet"];
  res.send(Case);
});

module.exports = router;