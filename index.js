const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const searchRoute = require('./routes/search');
const populateRoute = require('./routes/populate');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || '4545';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(req.path);
  res.send('Elastic Cloud Client Running...!');
});

app.use('/search', searchRoute);
app.use('/populate', populateRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.listen(port, () => {
  console.log('** App Listening on port ', +port);
});

module.exports = app;
