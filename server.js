const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

handlebars.registerPartials(__dirname + '/views/partials');
app.set('view engine', handlebars);

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

app.use(express.static(__dirname + '/public')); //use middleware

handlebars.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

handlebars.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express!</h1>');
  // response.send({
  //   name: 'John',
  //   likes: [
  //     'Golf',
  //     'basketball',
  //     'family'
  //   ]
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    homePageMessage: 'Hello, welcome to my Home Page!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to fulfill this request.'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});
