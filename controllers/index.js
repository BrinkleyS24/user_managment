const express = require('express');
const indexRouter = express.Router();
const User = require('../models/users')

//Index
indexRouter.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        res.render('index', {
            users: allUsers
        })
    })
});

//New

indexRouter.get('/add-user', (req, res) => {
    res.render('new');
});


//Create
indexRouter.post("/", (req, res) => {
    User.create(req.body, (error, createdBook) => {
        res.redirect('/index');
    });
})

//Show 
indexRouter.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('show', { user: foundUser });
    });
});
module.exports = indexRouter;