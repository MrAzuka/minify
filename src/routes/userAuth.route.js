import {
    Router
} from "express";
import signIn from "../controllers/signin.controller.js"
import signUp from "../controllers/signup.controller.js";


const router = Router()

router.post('/signup', signUp)

router.post('/signin', signIn)

export default router;