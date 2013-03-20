var http = require('http');

var express = require('express');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});


var users = require('./routes/users');

app.get('/users', users.findAll);

app.get('/users/:id', users.findById);

app.post('/users', users.addUser);

app.delete('/users/:id', users.deleteUser);

app.put('/users/:id', users.updateUser);

app.listen(3000);
  
console.log('Server runnning on port 3000');
