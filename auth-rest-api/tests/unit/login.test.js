const app = require('../../index');
const request = require('supertest');

describe('Authentification', () => {
    // test('On a une route /login', done => {
    //     request(app)
    //         .post('/login')
    //         .then(res => {
    //             expect(res.type).toBe('application/json');
    //             expect(res.statusCode).toBe(401);

    //             done();
    //         });
    // });
    test("Un utilisateur ne peut pas s'authentifier avec un email incorrect", done => {
        const user_obj = {
            email: 'admin@ovelo.fr',
            password: 'secret',
        };
        request(app)
            .post('/login')
            .send(user_obj)
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.headers['content-type']).toMatch(/json/);
                expect(response.status).toEqual(401);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: expect.any(String),
                    })
                );

                done();
            });
    });

    test("Un utilisateur ne peut pas s'authentifier avec un mot de passe incorrect", done => {
        const user_obj = {
            email: 'admin@ovelo.com',
            password: 'password',
        };

        request(app)
            .post('/login')
            .send(user_obj)
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.headers['content-type']).toMatch(/json/);
                expect(response.status).toEqual(401);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: expect.any(String),
                    })
                );

                done();
            });
    });

    test("Un utilisateur peut s'authentifier avec un mot de passe et un email", done => {
        const user_obj = {
            email: 'admin@ovelo.com',
            password: 'secret',
        };
        request(app)
            .post('/login')
            .send(user_obj)
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.headers['content-type']).toMatch(/json/);
                expect(response.status).toEqual(201);

                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                        user: {
                            _id: expect.any(String),
                            name: expect.any(String),
                            email: expect.any(String),
                            role: expect.any(String),
                            created_at: expect.any(String),
                            updated_at: expect.any(String),
                            __v: expect.any(Number),
                        },
                    })
                );
                expect(response.body.user.password).toEqual(undefined);
                done();
            });
    });
});
