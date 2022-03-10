import dotenv from 'dotenv';
dotenv.config()
import aws from 'aws-sdk';
import path from 'path';
import uuid from 'uuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
const {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME} = process.env

const UUID = uuid.v4
const AWSCredentials = {
    accessKey: AWS_ACCESS_KEY,
    secret: AWS_SECRET_KEY,
    bucketName: AWS_BUCKET_NAME
};

const s3 = new aws.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret
});


const upload = multer({
    storage: multerS3({
        s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            cb(null, `${UUID()}${ext}`)
        }
    })
})