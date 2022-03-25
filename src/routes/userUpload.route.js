import {
    Router
} from "express";
import upload from "../services/s3_aws_upload.js"
import single_upload from "../controllers/singleFileUpload.controller.js"
import multiple_upload from "../controllers/multipleFileUpload.controller.js"
import checkAuth from "../middleware/auth.js"

const router = Router()


// @routes /upload/single
// @desc   POST  Single File Upload
router.post('/single', checkAuth,upload.single("file"), single_upload)

// @routes /upload/multiple
// @desc   POST  Multiple File Upload
router.post('/multiple', checkAuth, upload.array("file",{maxCount: 3}), multiple_upload)

export default router;