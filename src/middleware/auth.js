import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const {JWT_SECRET} = process.env

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'Authentication Failed',
    });
  }
};

export default checkAuth;