const mongoose = require('mongoose');
//...farther down the page
mongoose.connect('mongodb://localhost:27017/meancrud');
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...');
});
