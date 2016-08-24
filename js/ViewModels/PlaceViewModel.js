
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
        self.places.push(new Place('Kalky Fish & Chips', -34.130658, 18.450053));

        self.sortPlacesByName();
    };

    self.initializeMarkers = function () {

        /** Creating a info windows */
        var largerInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        /** Style the markers a bit. This will be our listing marker icon. */
        var defaultIcon = makeMarkerIcon('0091ff');

        /**Create a "highlighted" location marker color for when the use mouses over the marker */
        var highlightedIcon = makeMarkerIcon('FFFF24');

        /**The following group uses the location array to create an array of markers on initialize.*/
        self.places().forEach(function (place) {

            place.marker = new google.maps.Marker({
                map: map,
                position: place.location,
                title: place.title,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon
            });

            /** Create an onclick event to open an infowindow at each marker */
            place.marker.addListener('click', function () {
                self.populateInfoWindow(this, largerInfowindow);
            });

            /** Change marker color on mouseover */
            place.marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon)
            });

            /** Change marker color on mouseout */
            place.marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });

            /** Extend the boundaries of the map for each marker */
            bounds.extend(place.marker.position);

            map.fitBounds(bounds);
        });

    }

    /**
     * Show Places
     * @func showPlaces
     */
    self.showPlaces = function () {

        var bounds = new google.maps.LatLngBounds();

        self.places().forEach(function (place) {
            place.marker.setMap(map);
            bounds.extend(place.marker.position);
        });

        map.fitBounds(bounds);
    };

    /** 
     * Hide places 
     * @func hidePlaces
    */
    self.hidePlaces = function () {
        self.places().forEach(function (place) {
            place.marker.setMap(null);
        });
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

    /**
     * Search Places
     */
    self.searchPlaces = function (value) {

    };

    /**
     * Marker Mouse Over Event
     * @func markerMouseOver
     */
    self.markerMouseOver = function (place) {
        var highlightedIcon = makeMarkerIcon('FFFF24');
        place.marker.setIcon(highlightedIcon);
    }

    /**
     * Marker Mouse Out Event
     * @func markerMouseOut
     */
    self.markerMouseOut = function (place) {
        var defaultIcon = makeMarkerIcon('0091ff');
        place.marker.setIcon(defaultIcon);
    }




    self.populateInfoWindow = function (marker, infowindow) {

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);


                    infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 30
                        }
                    };

                    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
                }
                else {
                    infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
                }
            }
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);
        }

    }

    /** This function takes in a COLOR, and then creates a new marker icon of theat color.
     * The icon will be 21 px wide by 24 high, have an origin of 0, 0 and be anchored at 10,34
     */
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
            new google.maps.Size(34, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34)
        )
        return markerImage;
    }


}