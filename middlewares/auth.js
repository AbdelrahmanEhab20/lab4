
//Authorization <MiddleWare></MiddleWare>
//Authorization
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    const data = jwt.verify(authorization, 'sdadsa5das56ds5a6das6fw6fqew5q');
    User.findOne({ username: data.username })
        .then(user => {
            req.user = user;
            next();
        })
}

module.exports = auth;