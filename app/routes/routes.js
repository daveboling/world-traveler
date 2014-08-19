'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    vacation       = require('../controllers/vacation'),
    less           = require('less-middleware');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static/'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);
  app.get('/vacations/new', vacation.init);
  app.get('/vacations', vacation.index);
  app.post('/vacations', vacation.create);
  app.get('/vacations/:id', vacation.spot);
  app.post('/vacations/:id/photos/download', vacation.downloadPhoto);
  app.post('/vacations/:id/photos/upload', vacation.uploadPhoto);

  console.log('Routes Loaded');
};

