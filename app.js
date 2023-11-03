const express = require('express');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('puplic'));
app.use(express.urlencoded({ extended: false }));

app.get('/index', function (req, res) {
  res.render('index');
});
app.get('/resturants', function (req, res) {
  const pathFile = path.join(__dirname, 'data', 'resturants.json');
  const resturants = JSON.parse(fs.readFileSync(pathFile));
  res.render('resturants', {
    numberOfResturants: resturants.length,
    resturants: resturants,
  });
});
app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/share-resturant', function (req, res) {
  res.render('share-resturant');
});

app.post('/share-resturant', function (req, res) {
  const resturant = req.body;
  const filePath = path.join(__dirname, 'data', 'resturants.json');
  const resturants = JSON.parse(fs.readFileSync(filePath));
  resturants.push(resturant);
  fs.writeFileSync(filePath, JSON.stringify(resturants));
  res.redirect('/confirmed');
});
app.get('/confirmed', function (req, res) {
  res.render('confirmed');
});

app.listen(3000);
