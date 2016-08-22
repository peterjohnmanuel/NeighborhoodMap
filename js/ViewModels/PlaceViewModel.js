
/** @func PlaceViewModel 
 * View model for Place functionality
*/
function PlaceViewModel() {

    var self = this;

    self.places = ko.observableArray();
    markers = ko.observableArray();

    self.initPlaces = function () {
        self.places.push(new Place('Scarborough Beach', -34.2002806, 18.3726442));
        self.places.push(new Place('Cape Point Lighthouse', -34.352502, 18.496412));
        self.places.push(new Place('Boulders Beach', -34.197637, 18.452005));
        self.places.push(new Place('Easy Tiger', -34.1080101, 18.4702441));
        self.places.push(new Place('Kalky Fish & Chips', -34.130658, 18.450053));

        self.sortPlacesByName();
    };

    self.InitializeMarkers = function () {

        /** Creating a info windows */
        var largerInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();


        /**The following group uses the location array to create an array of markers on initialize.*/
        self.places().forEach(function (place) {


            /**Create a marker per location, and put into markers array */
            var marker = new google.maps.Marker({
                map: map,
                position: place.location,
                title: place.title,
                animation: google.maps.Animation.DROP,
                //id: i
            });

            /** Push the marker to our array of markers */
            markers.push(marker);

            // /** Create an onclick event to open an infowindow at each marker */
            marker.addListener('click', function () {
                self.populateInfoWindow(this, largerInfowindow);
            });

            // /** Extend the boundaries of the map for each marker */
            bounds.extend(marker.position);

            map.fitBounds(bounds);
        });

    }

    self.showPlaces = function () {

        var bounds = new google.maps.LatLngBounds();

        // /** Extends the boundaries of the map for each marker and display the marker */
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);

        console.log("Show places has been clicked");

    };

    /**Hide places */
    self.hidePlaces = function () {
        markers.forEach(function (place) {
            place.setMap(null);
        });
        console.log("Hide places was clicked");
    };

    /**
     * Search Places
     */
    self.searchPlaces = function (value) {

    };

    /**
     * Sort Places
     * @func sortPlacesByName
     */
    self.sortPlacesByName = function () {
        self.places(self.places().sort(function (a, b) {
            return a.title == b.title ? 0 : (a.title < b.title ? -1 : 1)
        }));
    }

    self.populateInfoWindow = function (marker, infowindow) {

        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            /** Make sure the marker property is cleared if the infowindow is closed */
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker(null);
            });
        }

    }


}