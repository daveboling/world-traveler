'use strict';

var Vacation = require('../models/vacation'),
      moment = require('moment'),
      mp = require('multiparty');


exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  var v = new Vacation(req.body);
  Vacation.create(v, function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, vacations){
    res.render('vacations/index', {vacations: vacations, moment:moment});
  });
};

exports.spot = function(req, res){
  Vacation.findById(req.params.id, function(spot){
    res.render('vacations/spot',{vacation: spot, moment: moment});
  });

};

exports.downloadPhoto = function(req, res){
  Vacation.findById(req.params.id, function(vacation){
    vacation.downloadPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};

exports.uploadPhoto = function(req, res){
  Vacation.findById(req.params.id, function(vacation){
    var form = new mp.Form();
    //Parses the request object
    form.parse(req, function(err, fields, files){
      //put files in vacation.uploadPhotos
      vacation.uploadPhotos(files, function(){
        //Once called back, redirects to /vacations/:id
        res.redirect('/vacations/' + req.params.id);
      });
    });
  });
};
