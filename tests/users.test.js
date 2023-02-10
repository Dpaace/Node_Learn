const supertest = require('supertest')
const mongoose = require("mongoose")
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const user = {
    username: "testUser1", 
    password: "password"
}

beforeAll(async () => {
   await User.deleteMany({})
})

test('user registration', async () => {
    await api.post('/users/register')
    .send(user)
    .expect(201)
    .expect(res => {
        console.log(res)
        expect(res.body.status).toContain('sucessfully')
    })
})

test('user login', async () => {
    await api.post('/users/login')
    .send(user)
    .expect(200)
    .expect(res => {
        console.log(res)
        expect(res.body.status).toContain('Success')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

// cross-env NODE_ENV=test jest --verbose --watchAll --coverage