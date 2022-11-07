var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require ('cors');

var indexRouter = require('./routes/index');
var reflectionRouter = require('./routes/reflection');
var noteRouter = require('./routes/note');
// Added chatRouter
var chatRouter = require('./routes/chat');
// Added usersRouter
var usersRouter = require('./routes/users');
// Added authRouter
var authRouter = require('./routes/auth');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register all routes (stored in other files)
app.use('/', indexRouter);
app.use('/reflection', reflectionRouter);
app.use('/note', noteRouter)
// use chatRouter
app.use('/chat', chatRouter)
// use usersRouter
app.use('/users', usersRouter); 
// use authRouter
app.use('/', authRouter); 

module.exports = app;
