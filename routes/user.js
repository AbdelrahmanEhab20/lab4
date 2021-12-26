const express = require('express')
const router = express.Router();
const User = require("../models/user");
const mybycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationid, validationtodo } = require('../middlewares/validate');


// Get 
router.get("/", async (req, res, next) => {
    const { id } = req.user;
    // console.log(req.user);
    const users = await User.findById(id);
    res.json(users);
});

// Post
router.post("/", async (req, res, next) => {
    const user = req.body;
    const newuser = await User.create(user);
    res.json(newuser);
});

// Patch (Update)

router.patch("/", async (req, res, next) => {
    const { id } = req.user;
    const data = req.body;

    await User.findByIdAndUpdate(id, data)
        .then((edit) => res.json("User Updated"))
        .catch((element) => next("Can't FInd This ID"));
});

// Delete
router.delete("/", async (req, res, next) => {
    const { id } = req.user;
    await User.deleteOne({ _id: id })
        .then(data => res.json(data))
        .catch(err => next("Can't find this ID"));
});


//login 
router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isvalid = mybycrpt.compareSync(password, user.password);
    if (!isvalid) {
        res.json("Un_Authurized");
    }
    const token = jwt.sign({
        username,
        _id: user.id,
        maxAge: '1d',
    }, 'sdadsa5das56ds5a6das6fw6fqew5q');

    res.json({ token });
});

module.exports = router;

