var express = require('express');
var router = express.Router();

require('../models/connection');

const Tweet = require('../models/tweets');
const User = require('../models/users');

router.post('/', (req, res) => {
    // Récupération du token depuis le body (ou headers)
    const token = req.body.token;
    const message = req.body.message;

    // Vérification de l'existence de l'utilisateur via le token
    User.findOne({ token })
        .then((user) => {
            if (!user) {
                return res.json({ error: 'Utilisateur non trouvé' });
            }

            // Vérification du champ message
            if (!message) {
                return res.json({ error: 'Champs vide' });
            }

            // Création du tweet
            const newTweet = new Tweet({
                user: user._id,       // Utilisation de l'ID de l'utilisateur trouvé
                message: message,
                date: Date.now()      // Date.now() récupère la date au moment de la création du tweet
            });

            // Sauvegarde du tweet
            newTweet.save()
                .then((tweet) => {
                    res.json({ success: true, tweet });
                })
                .catch((err) => {
                    res.json({ error: 'Erreur lors de la création du tweet' });
                });
        })
        .catch((err) => {
            res.json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
        });
});


router.get('/tweets', (req, res) => {
    // Récupération des tweets avec les informations utilisateur
    Tweet.find()
        .populate('user', 'firstname username') // On récupère seulement firstname et username
        .then((tweets) => {
            // Comptage du nombre total de messages
            const nbMessages = tweets.length;

            // Structuration de la réponse
            const result = {
                nbMessages,
                tweets: tweets.map(tweet => ({
                    message: tweet.message,
                    firstname: tweet.user.firstname,
                    username: tweet.user.username,
                    date: tweet.date,
                    nbLike: tweet.nbLike
                }))
            };

            res.json(result);
        })
        .catch((err) => {
            res.json({ error: 'Erreur lors de la récupération des tweets' });
        });
});

router.get('/tweets', (req, res) => {
    // Récupération des tweets avec les informations utilisateur
    Tweet.find()
        .populate('user', 'firstname username') // On récupère seulement firstname et username
        .then((tweets) => {
            // Comptage du nombre total de messages
            const nbMessages = tweets.length;

            // Structuration de la réponse
            const result = {
                nbMessages,
                tweets: tweets.map(tweet => ({
                    message: tweet.message,
                    firstname: tweet.user.firstname,
                    username: tweet.user.username,
                    date: tweet.date,
                    nbLike: tweet.nbLike
                }))
            };

            res.json(result);
        })
        .catch((err) => {
            res.json({ error: 'Erreur lors de la récupération des tweets' });
        });
});


module.exports = router;


