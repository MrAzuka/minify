import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../models/db"
import {
    checkForUserQuery,
    insertUserQuery
} from "../models/queries"
const {
    JWT_SECRET,
    JWT_EXPIRES
} = process.env

const signUp = async (req, res) => {
    const {
        full_name,
        email,
        password
    } = req.body

    // TODO: Create an input validator

    // Check if user exists
    const checkForUser = await pool.query(checkForUserQuery, [email])
    try {
        if (user.rows[0]) {
            return res.status(409).json({
                status: 409,
                error: ['User Already Exists'],
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const insertUser = await pool.query(insertUserQuery, [full_name, email, hashedPassword, NOW()])
        const token = jwt.sign({
            userID: insertUser.rows[0].id,
            email: insertUser.rows[0].email
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES
        })

        res.status(200).json({
            status: 200,
            message: 'Successfully created a new account',
            token,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            error: err.map(detail => detail.message),
        });
    }
}

export default signUp;