'use strict';

/** @class Place */
function Place(title, lat, lng, pitch) {

    var self = this;
    self.title = title;
    self.location = { lat: lat, lng: lng }
    self.marker = null;
    self.icon;
    self.pitch = pitch;
}


/**
 * Beach subclass
 * @class Beach
 */

var Beach = function (title, lat, lng, pitch) {
    var self = this;

    this.icon = 'fa fa-umbrella';
    Place.call(self, title, lat, lng, pitch);
}


/** 
 * 
 * Beach subclass constructor
 * @constructor 
 * */
Beach.prototype = Object.create(Place.prototype);
Beach.prototype.constructor = Beach;


var Restaurant = function (title, lat, lng, pitch) {

    var self = this;

    self.icon = 'fa fa-cutlery';
    Place.call(self, title, lat, lng, pitch);
}


Restaurant.prototype = Object.create(Place.prototype);
Restaurant.prototype.constructor = Restaurant;


var Hotel = function (title, lat, lng, pitch) {

    var self = this;

    self.icon = 'fa fa-bed';
    Place.call(self, title, lat, lng, pitch);
}

Hotel.prototype = Object.create(Place.prototype);
Hotel.prototype.constructor = Hotel;


var View = function (title, lat, lng, pitch) {

    var self = this;

    self.icon = 'fa fa-street-view';
    Place.call(self, title, lat, lng, pitch);
}

View.prototype = Object.create(Place.prototype);
View.prototype.constructor = View;



var place1 = new Beach('Scarborough Beach', -34.2002806, 18.3726442, 0);
var place2 = new View('Cape Point Lighthouse', -34.352502, 18.496412);
var place3 = new Beach('Boulders Beach', -34.197637, 18.452005 , 0);
var place4 = new Restaurant('Knead Bakery', -34.1081888, 18.4697217, 30);
var place5 = new Restaurant('Kalky Fish & Chips', -34.130658, 18.450053, 0);
var place5 = new Restaurant('Fish on the rocks', -34.055082, 18.347874, 0);
var place6 = new Hotel('The Paddle Inn', -34.1372487,18.3317063, 30);

var initialPlaceList = [place1, place2 ,place3, place4, place5, place6];

//var initialPlaceList = [place1, place3];