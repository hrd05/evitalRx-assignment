const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

const authenticate = (req, res, next) => {

    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    const user = jwt.verify(token, process.env.JWT_TOKEN);

    User.findById(user.userId)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
};

module.exports = {
    authenticate
};
