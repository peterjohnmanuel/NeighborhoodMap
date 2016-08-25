'use strict';

/** @class Place */
function Place(title, lat, lng){

    var self = this;
    self.title = title;
    self.location = {lat: lat , lng:lng}
    self.marker = null;
}

var place1 = new Place('Scarborough Beach', -34.2002806, 18.3726442);
var place2 = new Place('Cape Point Lighthouse', -34.352502, 18.496412);
var place3 = new Place('Boulders Beach', -34.197637, 18.452005);
var place4 = new Place('Easy Tiger', -34.1080101, 18.4702441);
var place5 = new Place('Kalky Fish & Chips', -34.130658, 18.450053);

var initialPlaceList = [place1, place2, place3, place4, place5];