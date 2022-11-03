var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require ('cors');

var indexRouter = require('./routes/index');
var reflectionRouter = require('./routes/reflection');
var noteRouter = require('./routes/note')
// Added chatRouter
var chatRouter = require('./routes/chat')


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
// need to use chatRouter
app.use('/chat', chatRouter)

module.exports = app;
