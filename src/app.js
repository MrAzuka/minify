import express from "express";
import dotenv from "dotenv";

// importing routes
import indexRoute from "./routes/index.route.js"
import userAuthRoute from "./routes/userAuth.route.js"
import uploadRoute from "./routes/userUpload.route.js"


dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// mount the route
app.use(indexRoute)
app.use('/auth', userAuthRoute)
app.use('/upload', uploadRoute)

// handling errors
// create error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// send the error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.use((req, res, next) => {
    res.locals.user = res.user;
    next();
});

export default app