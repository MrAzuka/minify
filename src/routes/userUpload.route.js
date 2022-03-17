import {
    Router
} from "express";

import checkAuth from "../middleware/auth.js"

const router = Router()

router.post('/single_upload', checkAuth )

router.post('/multiple_upload', checkAuth)

export default router;