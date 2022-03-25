import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';
import {
    checkForUserQuery
} from "../models/queries.js"
const {
    JWT_SECRET,
    JWT_EXPIRES
} = process.env

const signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body
    try {
        const checkForUser = await pool.query(checkForUserQuery, [email])
        let hashed = ""
        // Check if it doesn't exist
        if (!checkForUser.rowCount) {
            return res.status(404).json({
                status: 404,
                error: ['Authentication Failed'],
            });
        }

        // If it exists
        if (checkForUser.rows[0]) {
            hashed = checkForUser.rows[0].password
        }

        // Compare password 
        const comparePassword = await bcrypt.compare(password, hashed)
        if (!comparePassword) {
            return res.status(409).json({
                status: 409,
                error: ['Auth failed'],
            });
        }

        if (comparePassword) {
            // create a login token
            const token = jwt.sign({
                userID: checkForUser.rows[0].user_id,
                email: checkForUser.rows[0].email
            }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES
            })

            return res.status(200).json({
                status: 200,
                message: 'Successfully logged in!',
                token,
            });
        }

    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: err,
        });
    }
}


export default signIn;