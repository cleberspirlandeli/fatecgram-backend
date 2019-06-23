// jest - supertest
// execute test with: npm test
const request = require('supertest');
const app = require('../../app');

describe('1.0 - Should tests functionalities with the users', () => {

    let _id = null;

    it('1.1 - Should create a new user', async () => {
        const response = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: "Test Jest",
                email: "test@jest.com",
                password: "1234567!"
            });

        _id = response.body._id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("active");
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("password");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
    });

    it('1.2 - Should does not create an existing user in the database', async () => {
        const response = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: "Test Jest",
                email: "test@jest.com",
                password: "1234567!"
            });

        expect(response.status).toBe(400);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("active");
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("email");
        expect(response.body[0]).toHaveProperty("password");
        expect(response.body[0]).toHaveProperty("createdAt");
        expect(response.body[0]).toHaveProperty("updatedAt");
    });

    it('1.3 - Should get all users in database', async () => {
        const response = await request(app)
            .get('/users');

        expect(response.status).toBe(200);
        expect(response.body.users.length).not.toBe(0);
        expect(response.body.users[0]).toHaveProperty("active");
        expect(response.body.users[0]).toHaveProperty("_id");
        expect(response.body.users[0]).toHaveProperty("name");
        expect(response.body.users[0]).toHaveProperty("email");
        expect(response.body.users[0]).toHaveProperty("password");
        expect(response.body.users[0]).toHaveProperty("createdAt");
        expect(response.body.users[0]).toHaveProperty("updatedAt");
    });

    it('1.4 - Should delete the user that was created in 1.1', async () => {
        const response = await request(app)
            .delete(`/users/${_id}`);

        expect(response.status).toBe(200);
    });

});

describe('2.0 - Should generate token with valid use', () => {

    let _id = null;
    let token = null;
    it('2.1 - Should create a new user', async () => {
        const response = await request(app)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                name: "Test Jest",
                email: "test@jest.com",
                password: "1234567!"
            });

        _id = response.body._id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("active");
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("password");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
    });

    it('2.2 - Should active the user that was created in 2.1', async () => {
        const response = await request(app)
            .get(`/users/active?user=${_id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user).toHaveProperty("active");
        expect(response.body.user).toHaveProperty("_id");
        expect(response.body.user).toHaveProperty("name");
        expect(response.body.user).toHaveProperty("email");
        expect(response.body.user).toHaveProperty("password");
        expect(response.body.user).toHaveProperty("createdAt");
        expect(response.body.user).toHaveProperty("updatedAt");
    });

    it('2.3 - Should user to log in using valid credentials', async () => {
        const response = await request(app)
            .post('/users/authentication')
            .set('Content-Type', 'application/json')
            .send({
                email: "test@jest.com",
                password: "1234567!"
            });

        token = response.body.token;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");

    });

    it('2.4 - Should decode the token generated in 2.3', async () => {
        const response = await request(app)
            .post('/users/decoded')
            .set('Content-Type', 'application/json')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("iat");
        expect(response.body).toHaveProperty("exp");
    });

    it('2.5 - Should delete the user that was created in 2.1', async () => {
        const response = await request(app)
            .delete(`/users/${_id}`);

        expect(response.status).toBe(200);
    });

    it('2.6 - Should does not send id to delete and return error 400', async () => {
        const response = await request(app)
            .delete(`/users/null`);

        console.log(response.body);
        expect(response.status).toBe(400);
    });

});