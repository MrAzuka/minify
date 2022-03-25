import {
    Router
} from "express";

const router = Router()


// @routes /
// @desc   GET  Welcome Page
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Minify'
    });
});

export default router;