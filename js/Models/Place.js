'use strict';

/**
 * base class for class objects 
 * @class Place 
 * */
function Place(title, lat, lng, pitch, heading) {

    var self = this;
    self.title = title;
    self.location = { lat: lat, lng: lng }
    self.marker = null;
    self.icon;
    self.pitch = pitch;
    self.heading = heading;
    self.city = 'Cape Town';    
}


/**
 * Beach subclass
 * @class Beach
 */

var Beach = function (title, lat, lng, pitch, heading) {
    var self = this;

    this.icon = 'fa fa-umbrella';
    Place.call(self, title, lat, lng, pitch, heading);
};


/** 
 * 
 * Beach subclass constructor
 * @constructor Beach
 * */
Beach.prototype = Object.create(Place.prototype);
Beach.prototype.constructor = Beach;


/**
 * Resturant class
 * @class Restaurant
 */
var Restaurant = function (title, lat, lng, pitch, heading) {

    var self = this;

    self.icon = 'fa fa-cutlery';
    Place.call(self, title, lat, lng, pitch, heading);
};


/**
 * Restaurant subclass constructor
 * @constructor Restaurant
 */
Restaurant.prototype = Object.create(Place.prototype);
Restaurant.prototype.constructor = Restaurant;


/**
 * Hotel class
 * @class Hotel
 */

var Hotel = function (title, lat, lng, pitch, heading) {

    var self = this;

    self.icon = 'fa fa-bed';
    Place.call(self, title, lat, lng, pitch, heading);
};

/**
 * Hotel subclass constructor
 * @constructor Hotel
 */
Hotel.prototype = Object.create(Place.prototype);
Hotel.prototype.constructor = Hotel;


/**
 * View class
 * @class View
 */
var View = function (title, lat, lng, pitch, heading) {

    var self = this;

    self.icon = 'fa fa-street-view';
    Place.call(self, title, lat, lng, pitch, heading);
};

/**
 * View subclass constructor
 * @constructor View
 */
View.prototype = Object.create(Place.prototype);
View.prototype.constructor = View;


/**
 * Beach instances
 */
var beach1 = new Beach('Scarborough Beach', -34.2002806, 18.3726442, 0, 0);
var beach2 = new Beach('Muizenberg Beach', -34.1080541, 18.4701478, 0, 0);
var beach3 = new Beach('Boulders Beach', -34.197637, 18.452005 , 0, 0);

/**
 * Hotel instances
 */
var hotel1 = new Hotel('The Paddle Inn', -34.1372487,18.3317063, 0, 150);
var hotel2 = new Hotel('12 Apostles Hotel & Spa', -33.9813703, 18.3726341, 0, 0);


/**
 * Restaurant instances
 */
var restaurant1 = new Restaurant('Knead Bakery', -34.1081888, 18.4697217, 0, 350);
var restaurant2 = new Restaurant('Kalky Fish & Chips', -34.130658, 18.450053, 155, 79.27);
var restaurant3 = new Restaurant('Fish on the rocks', -34.055082, 18.347874, 0, 0);

/**
 * View instances
 */
var view1 = new View('Cape Point', -34.352502, 18.496412, 0 , 0);


/** All places instances */
var initialPlaceList = [beach1, beach2 ,beach3, hotel1, hotel2, restaurant1 ,restaurant2, restaurant3, view1];