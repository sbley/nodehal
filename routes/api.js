var express = require('express');
var router = express.Router();
var con = require('../config/mysql');

const PORT = ':3000';

/* GET home resource. */
router.get('/', function(req, res, next) {
  const url = req.protocol + '://' + req.hostname + PORT + req.originalUrl;
  res.header('Content-Type', 'application/hal+json');
  res.hal({
    links: {
      self: url,
      slots: url + 'slots/'
    }
  });
});

/* GET slots. */
router.get('/slots/', function(req, res) {
  const url = req.protocol + '://' + req.hostname + PORT + req.originalUrl;
  con.query('SELECT * FROM SLOT', function(err, rows, fields) {
    if (err) throw err;
    console.log('Slots: ', rows);
    res.header('Content-Type', 'application/hal+json');
    res.hal({
      embeds: {'slots': rows.map(row => {
          return {'data' : row, 'links' : {'self': url + row.ID}};
        })
      },
      links: {
        self: url,
        rooms: req.protocol + '://' + req.hostname + PORT + req.baseUrl + '/rooms/'
      }
    });
  });
});

/* GET slot. */
router.get('/slots/:slot_id', function(req, res) {
  con.query('SELECT * FROM SLOT WHERE ID=' + req.params.slot_id, function(err, rows, fields) {
    if (err) throw err;
    console.log('Slots: ', rows);
    res.header('Content-Type', 'application/hal+json');
    res.hal({
      data: rows[0],
      links: {
        self: req.protocol + '://' + req.hostname + PORT + req.originalUrl
      }
    });
  });
});

/* GET Campus page. */
router.get('/rooms', function(req, res) {
  const url = req.protocol + '://' + req.hostname + PORT + req.originalUrl;
  con.query('SELECT * FROM ROOM', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rooms: ', rows);
    res.header('Content-Type', 'application/hal+json');
    res.hal({
      data: rows,
      links: {
        self: url
      }
    });
  });
});

module.exports = router;
