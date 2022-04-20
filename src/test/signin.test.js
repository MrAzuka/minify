import dotenv from 'dotenv'
dotenv.config()
import supertest from 'supertest'
import bcrypt from 'bcrypt'
import app from '../app.js'
import pool from '../models/db.js'
import {
    insertUserQuery,
    deleteOneUser
} from '../models/queries.js'

let full_name = "TEST USER"
let email = "test@email.com"
let password = "TESTPASSWORD"
let registered = "NOW()"

describe('The signin flow', () => {
    let hashed = ''
  
    bcrypt
      .hash(password, 10, (err, hash) => {
        hashed = hash
      })
  
    beforeAll(async () => {
      await pool.query(insertUserQuery, [full_name,email,password,registered])
    })
  
    it('should sign a registered user in', async () => {
      const response = await supertest(app)
        .post('/auth/login')
        .send({
          email: email,
          password: password,
        })
  
      expect(response.status).toBe(200)
      expect(response.body.status).toBe(200)
      expect(response.body.message).toBe('Successfully logged in!')
      expect(response.body.token).not.null
    })
  
    it('should not sign a user in if the email is not supplied', async () => {
      const response = await supertest(app)
        .post('/auth/login')
        .send({
          password: password,
        })
  
      expect(response.status).toBe(500)
      expect(response.body.status).toBe(500)
     })
  
    it('should not sign a user in if the password is not supplied', async () => {
      const response = await supertest(app)
        .post('/auth/login')
        .send({
          email: email,
        })
  
      expect(response.status).toBe(500)
      expect(response.body.status).toBe(500)
      })
  
    it('should not sign an unregistered user', async () => {
      const response = await supertest(app)
        .post('/auth/login')
        .send({
          email: 'iAmNotRegistered',
          password: 'iDontExist'
        })
  
      expect(response.status).toBe(404)
      expect(response.body.status).toBe(404)
      expect(response.body.error).toBe('Authentication Failed')
    })
  
    afterAll(async () => {
      await pool.query(deleteOneUser, [email])
      await pool.close()
    })
  
  
  })