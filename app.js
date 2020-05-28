var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors"); // nos permite realizar peticiones a un servidor mediante url

var indexRouter = require('./routes/index');


const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017F/Construcciones1', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://joseent:alemania2010@construccionesi-jnffg.mongodb.net/CONSTRUCCIONESI?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


var app = express();

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // aqui decimos que app utilize los cors requeridos en la linea 3
app.options("*", cors()); // idem anterior
app.use('/', indexRouter);
app.use('/images', express.static("images"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
