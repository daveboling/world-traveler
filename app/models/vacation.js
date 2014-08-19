'use strict';

var Mongo = require('mongodb'),
    _ = require('lodash'),
    cp = require('child_process'),
    path = require('path'),
    fs = require('fs');

function Vacation(o){
  this.name		= o.name;
  this.start		= new Date(o.start);
  this.end		= new Date(o.end);
  this.lat		= o.lat;
  this.lng		= o.lng;
  this.photos		= [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.create = function(vacation, cb){
  Vacation.collection.save(vacation, cb);
};

Vacation.findById = function(query, cb){
  var id = Mongo.ObjectID(query);
  Vacation.collection.findOne({_id: id}, function(err, obj){
    var vacation = _.create(Vacation.prototype, obj);
    cb(vacation);
  });
};

Vacation.prototype.downloadPhoto = function(url, cb){
  var paths = url.split('.'),
  path = paths[paths.length-1],
  dir = this._id,
  fileName = this.photos.length + '.' + path,
  self = this;


  cp.execFile(__dirname + '/../scripts/download.sh', [url, fileName, dir], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
    self.photos.push('/img/' + dir + '/' + fileName);
    Vacation.collection.save(self, cb);
  });

};

Vacation.prototype.uploadPhotos = function(files, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      exist = fs.existsSync(dir),
      self = this;
  
  //Check to see if the directory already exists
  if(!exist){
    fs.mkdirSync(dir);
  }

  //Loop through each photo and push them to the photos array
  files.photos.forEach(function(photo){
    var ext    = path.extname(photo.path),
        relative = '/img/' + self._id + '/' + self.photos.length + ext,
        absolute = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, absolute);

    self.photos.push(relative);
  });

  Vacation.collection.save(self, cb);
};


module.exports = Vacation;

