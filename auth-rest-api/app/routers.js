const express = require('express');
const router = express.Router();
const AppController = require('./controllers/AppController');
const validateEmail = require('../middlewares/validateEmail');
const validatePass = require('../middlewares/validatePass');

router.get(
    '/',
    AppController.index
);

router.post(
    '/login',
    [validateEmail, validatePass],
    AppController.login
);

/* 
Les users sont déjà en bdd, tu peux tester avec les trois disponibles, au choix : 

email: admin@ovelo.com
password: secret
role: administrateur

email: gestionnaire@ovelo.com
password: secret
role: gestionnaire

email: client@client.com
password: secret
role: client

*/

module.exports = router;
