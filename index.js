const express = require("express");
const mongoose = require("mongoose");
const todosRoutes = require('./routes/todo');
const usersRoutes = require('./routes/user')
const auth = require('./middlewares/auth');
const app = express();

mongoose.connect('mongodb://localhost:27017/Todo');

app.use(express.json());

app.use(auth);
app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);


app.use('*', (req, res, next) => {
    res.status(404).end();
})



app.use((err, req, res, next) => {
    res.status(500).json({ err });
});

app.listen(4000, () => {
    console.log(`Connection Successeded`);
});