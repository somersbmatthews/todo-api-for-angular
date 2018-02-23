const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //use .json(), not .urlencoded()

const todosController = require('./controllers/todoController.js');
app.use('/todos', todosController);

require('./db/db');




app.listen(3000, ()=>{
    console.log('listening on port 3000');
});