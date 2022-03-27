import {
    Router
} from "express";
import signIn from "../controllers/signin.controller.js"
import signUp from "../controllers/signup.controller.js";


const router = Router()

// @routes /auth/signup
// @desc   POST   Signup
router.post('/signup', signUp)

// @routes /auth/login
// @desc   POST   Login
router.post('/login', signIn)

export default router;