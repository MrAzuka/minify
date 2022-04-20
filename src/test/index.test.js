import dotenv from 'dotenv';
dotenv.config()
import supertest from 'supertest';
import app from '../app.js';



describe('The landing page', () => {
    it('Should get the landing route', async() => {
        const response = await supertest(app)
        .get('/')
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Welcome to Minify");
        expect(response.body.message).not.null;
    })
})