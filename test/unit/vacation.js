/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Mongo     = require('mongodb'),
    Vacation  = require('../../app/models/vacation'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'travelers';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      var v = new Vacation({name: 'Paris', start: new Date('7/7/14'), end: new Date('7/10/14'), lat: 20, lng: 20});
      expect(v).to.be.instanceof(Vacation);
    });
  });

  describe('#create', function(){
    it('should create a new vacation and save it to the database', function(done){
      var v = new Vacation({name: 'Paris', start: new Date('7/7/14'), end: new Date('7/10/14'), lat: 20, lng: 20});
      Vacation.create(v, function(){
        expect(v._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Vacation.all(function(err, people){
        expect(people).to.have.length(2);
        done();
      });
    });
  });
});

