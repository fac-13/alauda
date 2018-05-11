const fetch = require('node-fetch');

exports.get = (req, res) => {
    console.log("randomGift.js is reached")
    res.render('randomGift');
  };