var express = require('express');
var router = express.Router();

const Users = require('../models/users');

// POST /signup : route chargée d’inscrire un utilisateur dans la collection Users.
// Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result:   false, error: 'Missing or empty fields' }.
// Si l’email est déjà enregistré dans la base de données, renvoyez : { result: false, error: 'User already exists' }.
// Sinon, renvoyez : { result: true }.

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
        res.status(200).json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    Users.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(200).json({ result: false, error: 'User already exists' });
            } else {
                const newUser = new Users({ name, email, password });
                newUser.save()
                    .then(() => {
                        res.status(200).json({ result: true });
                    })
                    .catch(err => res.status(200).json({ result: false, error: 'Error saving user' }));
            }
        })
        .catch(err => res.status(200).json({ result: false, error: 'Error finding user' }));
});


// POST /signin : route chargée de vérifier la connexion d’un utilisateur.
// Si l’email ou le mdp renvoyé est indéfini ou vide, renvoyez : { result: false, error: 'Missing or empty fields' }.
// Si aucun utilisateur est trouvé avec cet email et mdp, renvoyez : { result: false, error: 'User not found' }.
// Sinon, renvoyez : { result: true }.

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({ result: false, error: 'Missing or empty fields' });
    }

    Users.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                res.status(200).json({ result: false, error: 'User not found' });
            } else {
                res.status(200).json({ result: true });
            }
        })
        .catch(err => res.status(500).json({ result: false, error: 'Error finding user' }));
});


module.exports = router;
