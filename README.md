# Create an API

## Lesson Objectives

1. Define API
1. Initialize Directory
1. Set Up Express Server
1. Create Todo Controller
1. Initialize Mongoose
1. Create Todo Model
1. Create Create Route
1. Create Index Route
1. Create Delete Route
1. Create Update Route

## Initialize Directory

1. `npm init`
1. set entry point as server.js
1. `touch server.js`
1. `npm install express --save`

## Set Up Express Server

server.js:

```javascript
const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log('listening...');
});
```

## Create Todo Controller

1. `mkdir controllers`
1. `touch controllers/todos.js`

controllers/todos.js:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('index');
});

module.exports = router;
```

server.js:

```javascript
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);
```

Test with postman.

## Initialize Mongoose

1. `npm install mongoose --save`
1. `mkdir db; touch db/db.js`

db/db.js:

```javascript
const mongoose = require('mongoose');
//...farther down the page
mongoose.connect('mongodb://localhost:27017/meancrud');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});
```

server.js:

```javascript
require('./db/db');
```

## Create Todo Model

1. `mkdir models`
1. `touch models/todos.js`

models/todos.js:

```javascript
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    description: String,
    complete: Boolean
});

const Todos = mongoose.model('Todo', todoSchema);

module.exports = Todos;
```

## Create Create Route

1. `npm install body-parser --save`
1. When we include body parser, we need to tell it to expect JSON data coming in from AJAX, so we'll use `bodyParser.json()`
1. We'll also need to tell the client that the data coming back is JSON, not HTML, so we'll do `res.json()`

server.js:

```javascript
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //use .json(), not .urlencoded()
```

controllers/todos.js

```javascript
const Todos = require('../models/todos.js');
//...farther down the page
router.post('/', (req, res)=>{
    Todos.create(req.body, (err, createdTodo)=>{
        res.json(createdTodo); //.json() will send proper headers in response so client knows it's json coming back
    });
});
```

Test with Postman.

## Create Index Route

controllers/todos.js:

```javascript
router.get('/', (req, res)=>{
    Todos.find({}, (err, foundTodos)=>{
        res.json(foundTodos);
    });
});
```

Test with Postman.

## Create Delete Route

```javascript
router.delete('/:id', (req, res)=>{
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodo)=>{
        res.json(deletedTodo);
    });
});
```

Test with Postman.

## Create Update Route

controllers/todos.js:

```javascript
router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo)=>{
        res.json(updatedTodo);
    });
});
```

Test with Postman.
