'use strict';

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

module.exports = Vacation;

