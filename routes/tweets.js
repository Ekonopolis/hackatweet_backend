var express = require('express');
var router = express.Router();

require('../models/connection');

const Tweet = require('../models/tweets');


router.post('/', (req, res) => {

    const newTweet = new Tweet({
        message : req.body.message,
        //date : req.body.date,
        //nbLike: req.body.nbLike,
        //user: req.body.user
    })

    newTweet.save().then(newDoc => {
        res.json({ result: true });
      });
});

module.exports = router;