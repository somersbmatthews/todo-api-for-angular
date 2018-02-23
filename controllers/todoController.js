const express = require('express');
const router = express.Router();
const Todos = require('../models/todoModel.js');

router.get('/', (req, res)=>{
    res.send('index');
});

router.post('/', (req, res)=>{
    Todos.create(req.body, (err, createdTodo)=>{
        res.json(createdTodo); //.json() will send proper headers in response so client knows it's json coming back
    });
});

router.delete('/:id', (req, res)=>{
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodo)=>{
        res.json(deletedTodo);
    });
});

router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo)=>{
        res.json(updatedTodo);
    });
});

module.exports = router;