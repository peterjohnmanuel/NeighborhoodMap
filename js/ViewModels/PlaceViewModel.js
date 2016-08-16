
/** @func PlaceViewModel 
 * View model for Place functionality
*/
function PlaceViewModel() {

    var self = this;

    self.places = ko.observableArray();

    self.initPlaces = function () {
        self.places.push(new Place('Scarborough Beach', -34.2002806, 18.3726442));
        self.places.push(new Place('Cape Point Lighthouse', -34.352502, 18.496412));
        self.places.push(new Place('Boulders Beach', -34.197637, 18.452005));
        self.places.push(new Place('Easy Tiger', -34.1080101, 18.4702441));
    }

    self.showPlaces = function () {

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
    self.hidePlaces = function () {
        // self.places.forEach(function(place) {
        //    place.setMap(null); 
        // });
        console.log("Hide places was clicked");
    };

    self.searchPlaces = function (value) {

    };

}