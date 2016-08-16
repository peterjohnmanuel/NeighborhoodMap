
/** @func PlaceViewModel 
 * View model for Place functionality
*/
function PlaceViewModel(){

    var self = this;

    self.places = ko.observableArray([
        new Place('Park Ave Penthouse',  40.7713024,  -73.9632393),
        new Place('Chelsea Loft',  40.7444833, -73.9949465),
        new Place('East Village Hip Studio',  40.7281777, -73.984377),
        new Place('TriBeCa Artsy Bachelor Pad', 40.7195264, -74.0089934),
        new Place('Chinatown Homey Space', 40.7180628,  -73.9961237),
    ]);

    self.showPlaces = function() {

        console.log("here");

        // var bounds = new google.maps.LatLngBounds();

        // /** Extends the boundaries of the map for each marker and display the marker */
        // for(var i = 0; i < self.places.length; i++){
        //     self.places[i].setMap(map);
        //     bounds.extend(self.places[i].position);
        // }
        // map.fitBounds(bounds);

    };

    /**Hide places */
    self.hidePlaces = function() {  
        // self.places.forEach(function(place) {
        //    place.setMap(null); 
        // });
        console.log("Hide places was clicked");
    }; 

    self.searchPlaces = function(value) {

    }; 

}

var test = ko.applyBindings(new PlaceViewModel());