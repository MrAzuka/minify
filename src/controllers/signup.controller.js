import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../models/db.js"
import {validateSignup} from "../utils/signup.validator.js"
import {
    checkForUserQuery,
    insertUserQuery
} from "../models/queries.js"
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

    // input validator
    // full_name must be a string
    // email must be in email format
    // password must be a min(6), max(20) and a string.
    const validInput = validateSignup(full_name,email, password)

    try {
        // Check if input is valid
        if (validInput) {
            // Check if user exists
    const checkForUser = await pool.query(checkForUserQuery, [email])
    if (checkForUser.rows[0]) {
        return res.status(409).json({
            status: 409,
            error: 'User Already Exists',
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const insertUser = await pool.query(insertUserQuery, [full_name, email, hashedPassword, "NOW()"])
    const token = jwt.sign({
        userID: insertUser.rows[0].user_id,
        email: insertUser.rows[0].email
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES
    })

    res.status(201).json({
        status: 201,
        message: 'Successfully created a new account',
        token,
    });
        } 
        
        console.log(validInput.error)
        res.redirect("/auth/signup")
        // TODO: Flash error message to identify what input didn't validate
    
    
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 500,
            err
        });
    }
}

export default signUp;