import pool from '../models/db.js';
import {
    insertUserFileQuery
} from "../models/queries.js"

const single_upload = async (req, res) => {
    try {
        const uploaded = req.file.location
        console.log(req.file)
        const insertFile = await pool.query(insertUserFileQuery, [uploaded, req.token.userID])
        await res.status(200).json({
            status: 200,
            message: 'Successfully uploaded file'
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: 'Could not upload file',
            err
        })
    }
    
}

export default single_upload;