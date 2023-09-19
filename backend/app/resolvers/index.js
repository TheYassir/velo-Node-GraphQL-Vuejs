// Types
const Bike = require('./bike');
const KindOfBike = require('./kindOfBike');
const PointOfSale = require('./pointOfSale');
const Rent = require('./rent');

// Query and mutations
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
    Bike,

    KindOfBike,

    PointOfSale,

    Rent,

    // Liste des actions de récupération possibles
    Query,

    Mutation,
};
