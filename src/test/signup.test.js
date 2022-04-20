import dotenv from 'dotenv';
dotenv.config()
import supertest from 'supertest';
import app from '../app.js';
import pool from '../models/db.js';
import {
    deleteOneUser
} from '../models/queries.js'



let full_name = "TEST USER"
let email = "test@email.com"
let password = "TESTPASSWORD"
let registered = "NOW()"
describe('SignUp Process', () => {
    beforeAll(async () => {
        await pool.query(deleteOneUser, [email])
    })

    it('Register new user to DB', async () => {
        const response = await supertest(app)
            .post('/auth/signup')
            .send({
                full_name: full_name,
                email: email,
                password: password,
                registered: registered
            })
        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Successfully created a new account')
        expect(response.body.token).not.null
    })

    it('should not register user if the email is not present', async () => {
        const response = await supertest(app)
            .post('/auth/signup')
            .send({
                full_name: 'newFullName',
                password: 'newUser0'
            })
        expect(response.status).toBe(500)
        expect(response.body.status).toBe(500)
        expect(response.body.message).toBeUndefined()
        expect(response.body.token).toBeUndefined()
    })

    it('should not register user if the password is not present', async () => {
        const response = await supertest(app)
            .post('/auth/signup')
            .send({
                full_name: 'newFullNameTwo',
                email: 'newtest2@email.com'
            });
        expect(response.status).toBe(500)
        expect(response.body.status).toBe(500)
        expect(response.body.message).toBeUndefined()
        expect(response.body.token).toBeUndefined()
    })

    it('check if user already exists in db', async () => {
        const response = await supertest(app)
            .post('/auth/signup')
            .send({
                full_name: full_name,
                email: email,
                password: password,
                registered: registered
            })
        expect(response.status).toBe(409)
        expect(response.body.error).toBe('User Already Exists')
    })

    it('should not register user if the length of the password is less than 3', async () => {
        const response = await supertest(app)
            .post('/auth/signup')
            .send({
                full_name: full_name,
                email: 'fake@email.com',
                password: 'ao',
                registered: registered
            });
        expect(response.status).toBe(500);
        expect(response.body.status).toBe(500);
        expect(response.body.message).toBeUndefined();
    })

    afterAll(async () => {
        await pool.close();
    })
})