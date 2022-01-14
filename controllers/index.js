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

//Delete
indexRouter.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/index')
    })
})
//Update
indexRouter.put("/:id", (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedUser) => {
            res.redirect(`/index/${req.params.id}`)
        }
    )
})

//Create
indexRouter.post("/", (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/index');
    });
})

//Edit 
indexRouter.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('edit', {
            user: foundUser,
        })
    })
})

//Show 
indexRouter.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        res.render('show', { user: foundUser });
    });
});
module.exports = indexRouter;