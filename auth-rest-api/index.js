require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoConnexion } = require('./app/models/connexion');
const app = express();
const errorHandlers = require('./handlers/errorHandlers');
const router = require('./app/routers');

app.use(cors('*'));

const options = { extended: false };
app.use(express.json(options));

app.use(router);

// 404
app.use(errorHandlers.notFound);

// On affiche plus d'infos si on est development
if (app.get('env') === 'development') {
    app.use(errorHandlers.devErrors);
} else {
    // Les messages d'erreurs pour la prod
    app.use(errorHandlers.prodErrors);
}

app.set('base_url', process.env.BASE_URL);
app.set('port', process.env.PORT);

mongoConnexion().then(console.log);

app.listen(app.get('port'), _ => {
    console.log(`${app.get('base_url')}:${app.get('port')}`);
});

module.exports = app;
