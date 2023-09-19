require('dotenv').config();
const debug = require('debug')('app:server');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const resolvers = require('./app/resolvers');
const typeDefs = require('./app/schemas');
const VeloPG = require('./app/datasources/veloPG');
const ExchangeRate = require('./app/datasources/exchangeRate');
const jwt = require('./app/helpers/jwt');

const server = new ApolloServer({
    // Schema qui décrit ce que le client va pouvoir demander à notre serveur
    typeDefs,
    // C'est la logique de récupération des données fourni en réponse aux requêtes sur le serveur
    resolvers,
});

const port = process.env.PORT ?? 4000;

const knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.PGHOST ?? 'localhost',
        port: process.env.PGPORT ?? 5432,
        user: process.env.PGUSER ?? 'postgres',
        password: process.env.PGPASSWORD ?? null,
        database: process.env.PGDATABASE ?? 'velo',
    },
};

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port },
        context: async ({ req }) => {
            const { cache } = server;
            return {
                // We create new instances of our data sources with each request,
                // passing in our server's cache.
                dataSources: {
                    veloDB: new VeloPG({ knexConfig, cache }),
                    exchangeRate: new ExchangeRate({ cache }),
                },
                ...req,
                ip: req.headers['x-forwarded-for']
                    ? req.headers['x-forwarded-for'].split(/, /)[0]
                    : req.ip,
                user: jwt.get(req),
            };
        },
    });

    debug(`🚀  Server ready at: ${url}`);
})();
