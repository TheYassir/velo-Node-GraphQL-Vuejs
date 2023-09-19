const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const secret = process.env.JWT_SECRET || 'secret';

module.exports = {
    get(request) {
        if (request.header('authorization')) {
            const bearerHeader = request.header('authorization');
            const [, token] = bearerHeader.split(' ');

            try {
                const {
                    user: { user },
                } = jwt.verify(token, secret);

                if (
                    !['gestionnaire', 'client', 'administrateur'].includes(
                        user.role,
                    )
                ) {
                    throw new GraphQLError("This role can't access to this service, please renew your token /signin", {
                        extensions: {
                            code: 'UNAUTHORIZED',
                            http: {
                                status: 403,
                            },
                        },
                    });
                }

                return user;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                        http: {
                            status: 401,
                        },
                    },
                });
            }
        } else if (typeof request.header('authorization') !== 'undefined') {
            throw new GraphQLError('Missing token', {
                extensions: {
                    code: 'UNAUTHENTICATED',
                    http: {
                        status: 403,
                    },
                },
            });
        }
        return null;
    },
};
