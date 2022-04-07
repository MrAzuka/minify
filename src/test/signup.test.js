import dotenv from 'dotenv';
dotenv.config()
import supertest from 'supertest';
import app from '../app.js';
import pool from '../models/db.js';
import {deleteOneUser} from '../models/queries.js'



let full_name = "TEST USER"
let email = "test@email.com"
let password = "TESTPASSWORD"
let registered = "NOW()"
describe('SignUp Process', () => {
    beforeAll(async () =>{
        await pool.query(deleteOneUser,[email])
    })

    it('regis')
})