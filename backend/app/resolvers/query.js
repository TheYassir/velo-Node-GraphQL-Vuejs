const { GraphQLError } = require('graphql');

const authenticationError = new GraphQLError('Authentication required!.', {
    extensions: {
        code: 'UNAUTHENTICATED',
        http: {
            status: 401,
        },
    },
});

module.exports = {
    getBike(_, args, { dataSources }) {
        return dataSources.veloDB.bike.pkLoader.load(args.id);
    },
    getBikes(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }
        return dataSources.veloDB.bike.findAll({ $where: args.filter });
    },
    async getBikeInRent(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }
        const rows = await dataSources.veloDB.bike.findAll({
            $where: { number: args.number, status: 'RENT' },
        });
        return rows[0];
    },

    getKindsOfBike(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }
        return dataSources.veloDB.kindOfBike.findAll(args);
    },

    getPointsOfSale(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }

        return dataSources.veloDB.pointOfSale.findAll(args);
    },

    getRents(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }
        return dataSources.veloDB.rent.findAll(args);
    },
};
