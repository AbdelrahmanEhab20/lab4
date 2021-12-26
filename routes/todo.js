const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const user = require("../models/user");
//const { validationid, validationtodo } = require('../middlewares/validate')
//  Get All Todos

router.get("/", async (req, res, next) => {
    const { id } = req.user;
    console.log(id);
    // const { limit, skip } = req.query;
    // console.log(req.query);
    // if (limit && skip) {
    //     const li = limit === '' ? 10 : limit;
    //     const sk = skip === '' ? 0 : skip;
    //     const todos = await Todo.find({ user: id }).limit(+li).skip(+sk);
    //     res.json(todos);
    //     return;
    // }
    // const todos = await Todo.find({ user: id });
    // res.json(todos);
});

// Post
router.post("/", async (req, res, next) => {
    const { id } = req.user;
    const todo = req.body;
    try {
        const doc = await Todo.create({ user: id, ...todo });
        res.json(doc);
    } catch (error) {
        next(error);
    }
});

// 3- Patch (Update)

router.patch("/:id", async (req, res, next) => {
    const { id } = req.user;
    const todo = req.body;
    // console.log(todo);

    await Todo.findOneAndUpdate({ user: id }, { ...todo })
        .then((edit) => res.json("Todo Updated"))
        .catch((element) => next("Can't Find This ID"));
});

// 4- Delete

router.delete("/", async (req, res, next) => {
    const { id } = req.user;
    await Todo.deleteOne({ user: id })
        .then((del) => {
            if (del.deletedCount == 0) {
                res.status(500).json({ mss: "Can't find todo" });
            }
            res.json({ mess: "delete sucess" });
        })
        .catch((err) => next(err));
});

module.exports = router;