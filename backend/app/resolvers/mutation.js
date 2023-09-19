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
    async addRent(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }

        const { bike_number: number, ...data } = args.input;
        const [[bike], pointOfSale] = await Promise.all([
            dataSources.veloDB.bike.findAll({ $where: { number } }),
            dataSources.veloDB.pointOfSale.findByPk(data.rent_point_of_sale_id),
        ]);

        if (!pointOfSale) {
            throw new GraphQLError('Point of sale not found!', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: {
                        status: 400,
                    },
                },
            });
        }

        if (!bike) {
            throw new GraphQLError('Bike not found!', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: {
                        status: 400,
                    },
                },
            });
        }

        if (bike.status !== 'AVAILABLE') {
            throw new GraphQLError('Bike not available', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: {
                        status: 400,
                    },
                },
            });
        }

        await dataSources.veloDB.bike.update({
            id: bike.id,
            status: 'RENT',
        });
        return dataSources.veloDB.rent.insert({
            ...data,
            bike_id: bike.id,
        });
    },

    async stopRent(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }

        const { bike_number: number, ...data } = args.input;
        const [bike] = await dataSources.veloDB.bike.findAll({
            $where: { number },
        });

        if (!bike) {
            throw new GraphQLError('Bike not found!', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: {
                        status: 400,
                    },
                },
            });
        }

        const [rent] = await dataSources.veloDB.rent.findAll({
            $where: {
                bike_id: bike.id,
                return_date: null,
            },
        });

        if (!rent) {
            throw new GraphQLError('Rent not found!', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    http: {
                        status: 400,
                    },
                },
            });
        }

        data.id = rent.id;
        if (!data.return_date) {
            data.return_date = new Date();
        }

        const [rentUpdated] = await dataSources.veloDB.rent.update(data);

        await dataSources.veloDB.bike.update({
            id: rentUpdated.bike_id,
            status: 'AVAILABLE',
        });

        return rentUpdated;
    },

    addBike(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }

        return dataSources.veloDB.bike.insert(args.input);
    },

    async updateBike(_, args, { dataSources, user }) {
        if (!user) {
            throw authenticationError;
        }

        const [bike] = await dataSources.veloDB.bike.update({
            id: args.id,
            ...args.input,
        });
        return bike;
    },
};
