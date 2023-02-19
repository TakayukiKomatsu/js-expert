const { describe, it } = require('mocha')
const request = require('supertest')
const assert = require('assert')

const app = require('./api')

describe('Api Suite test', () => {
    describe('/contact', async () => {
        it('should request the contact page and return http status 200', async () => {
            const response = await request(app).get('/contact').expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', async () => {
        it('should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(app).get('/hi').expect(200)
            assert.deepStrictEqual(response.text, 'Hello World')
        })
    })
    describe('/login', async () => {
        it('should login successfuly on login route and return HTTP status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'ErickWendel',
                    password: '123'
                })
                .expect(200)
            assert.deepStrictEqual(response.text, 'Login has succeeded')
        })

        it('should unauthorize a request when requesting it using wrong credencials and return Http status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'IncorrectUsername',
                    password: '123'
                })
                .expect(401)
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Unauthorized')
        })
    })
})
