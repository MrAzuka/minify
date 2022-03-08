import express from "express";
import dotenv from "dotenv";

// TODO: importing routes

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// TODO: mount the route


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

module.exports = app;