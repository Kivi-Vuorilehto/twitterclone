const path = require('path');
const favicon = require('serve-favicon');
const route = require('./routes/route');

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");


const express = require('express');
const app = express();
const port = 8080;

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'public','js')));
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'img')));
app.use(favicon(path.join(__dirname, '..', 'public', 'ico', 'favicon.ico')));

app.use('/', route);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;


app.get('/', (req, res) => {
  res.json({message: 'Welcome to twitterclone initial version!'});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});