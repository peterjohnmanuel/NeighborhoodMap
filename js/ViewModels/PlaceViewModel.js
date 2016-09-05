
/** @func PlaceViewModel 
 * View model for Place functionality
*/
function PlaceViewModel() {

    var self = this;

    var largerInfoWindow = null;
    var bounds = null;
    
    self.places = ko.observableArray(initialPlaceList);
    self.searchPlaces = ko.observable('');

    self.markersVisible = ko.observable(true);
    self.hotelVisible = ko.observable(true);
    self.beachVisible = ko.observable(true);
    self.viewVisible = ko.observable(true);
    self.restaurantVisible = ko.observable(true);

    self.initPlaces = function () {
        self.sortPlacesByName();
    };

    self.initializeMarkers = function () {

        /** Creating a info windows */
        largerInfoWindow = new google.maps.InfoWindow();
        bounds = new google.maps.LatLngBounds();

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
                self.populateInfoWindow(place, largerInfoWindow);
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
     * Sort Places
     * @func sortPlacesByName
     */
    self.sortPlacesByName = function () {
        self.places(self.places().sort(function (a, b) {
            return a.title == b.title ? 0 : (a.title < b.title ? -1 : 1)
        }));
    }

    /**
     * Filters places based on the searchPlaces observable
     * @func filteredPlaces
     */
    self.filteredPlaces = ko.pureComputed({

        read: function () {

            return ko.utils.arrayFilter(self.places(), function (place) {

                var result = place.title.toLowerCase().indexOf(self.searchPlaces().toLowerCase()) > -1;

                /** Check if the hotel filter has been applied. */
                if (place.constructor.name === 'Hotel' && self.hotelVisible() !== null && place.marker !== null) {

                    if (self.hotelVisible() === true && result == false) {
                        place.marker.setVisible(result);
                        return result;
                    }
                    else {
                        place.marker.setVisible(self.hotelVisible());
                        return self.hotelVisible();
                    }
                }

                /** Check if the beach filter has been applied. */
                if (place.constructor.name === 'Beach' && self.beachVisible() !== null && place.marker !== null) {

                    if (self.beachVisible() === true && result == false) {
                        place.marker.setVisible(result);
                        return result;
                    }
                    else {
                        place.marker.setVisible(self.beachVisible());
                        return self.beachVisible();
                    }
                }

                /** Check if the view filter has been applied. */
                if (place.constructor.name === 'View' && self.viewVisible() !== null && place.marker !== null) {

                    if (self.viewVisible() === true && result == false) {
                        place.marker.setVisible(result);
                        return result;
                    }
                    else {
                        place.marker.setVisible(self.viewVisible());
                        return self.viewVisible();
                    }
                }

                /** Check if the restaurant filter has been applied. */
                if (place.constructor.name === 'Restaurant' && self.restaurantVisible() !== null && place.marker !== null) {

                    if (self.restaurantVisible() === true && result == false) {
                        place.marker.setVisible(result);
                        return result;
                    }
                    else {
                        place.marker.setVisible(self.restaurantVisible());
                        return self.restaurantVisible();
                    }
                }

                /** Code from here is for the initial loading of the view. */
                if (place.marker !== null)
                    place.marker.setVisible(result);

                return result;
            });
        }
    });

    /**
     * Marker Mouse Over Event
     * @func markerMouseOver
     */
    self.markerMouseOver = function (place) {
        var highlightedIcon = makeMarkerIcon('FFFF24');
        place.marker.setIcon(highlightedIcon);
    };

    /**
     * Marker Mouse Out Event
     * @func markerMouseOut
     */
    self.markerMouseOut = function (place) {
        var defaultIcon = makeMarkerIcon('0091ff');
        place.marker.setIcon(defaultIcon);
    };

    /**
     * Show the selected place's' infoWindow
     * @func showPlaceInfoWindow
     */
    self.showPlaceInfoWindow = function (place) {
        self.populateInfoWindow(place, largerInfoWindow);
    };


    /**
     * Populate the info window on click
     * @func populateInfoWindow
     */
    self.populateInfoWindow = function (place, infoWindow) {

        if (infoWindow.marker != place.marker) {

            infoWindow.setContent('');
            infoWindow.marker = place.marker;

            infoWindow.addListener('closeclick', function () {
                infoWindow.marker = null;
            });

            var streetViewService = new google.maps.StreetViewService();
            var radius = 50;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options

            var infoWindowWeatherEntry = '<hr class="hr"><h6 id="weather"></h6>';

            getWeatherEntryForLocation(place);

            var infoWindowLayout = '<div class="infoWindow"></div>';
            var infoWindowHeading = '<h4><i class="fa ' + place.icon + '"></i> ' + place.marker.title + '</h4><hr class="hr">';
            var infoWindowStreetView = '<div id="pano"></div>';
            var infoWindowWikipediaEntry = '<div id="wikiEntries"><ul>%data</ul></div>';

            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, place.marker.position);


                    infoWindow.setContent('<div>' + infoWindowHeading + '</div><div id="streetView"></div><ul id="wikipedia"></ul><ul id="wikipedia"></ul>' + infoWindowWeatherEntry);
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 20
                        }
                    };

                    var panorama = new google.maps.StreetViewPanorama(document.getElementById('streetView'), panoramaOptions);
                }
                else {
                    infoWindow.setContent('<div>' + infoWindowHeading + '</div>' + '<div>No Street View Found</div><ul id="wikipedia"></ul>' + infoWindowWeatherEntry);
                }
            }

            getWikipediaEntries(place);

            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(place.marker.position, radius, getStreetView);
            // Open the infowindow on the correct marker.
            infoWindow.open(map, place.marker);
        }

    };


    /**
     * sets the markers visibility 
     * @func setMarkersVisibility
     */
    self.setMarkersVisibility = function () {
        if (self.markersVisible() === true) {

            self.places().forEach(function (place) {
                place.marker.setMap(null);
            });

            self.markersVisible(false);
        }
        else if (self.markersVisible() === false) {

            bounds = new google.maps.LatLngBounds();

            self.places().forEach(function (place) {
                place.marker.setMap(map);
                bounds.extend(place.marker.position);
            });

            map.fitBounds(bounds);

            self.markersVisible(true)
        }
    };

    /** 
     * Set Hotel Visibility based on state
     * @func setHotelVisibility
     */
    self.setHotelVisibility = function () {
        self.hotelVisible() === true ? self.hotelVisible(false) : self.hotelVisible(true);
        self.filteredPlaces();
    };

    /**
     * Set Beach Visibility based on state
     * @func setBeachVisibility
     */
    self.setBeachVisibility = function () {
        self.beachVisible() === true ? self.beachVisible(false) : self.beachVisible(true);
        self.filteredPlaces();
    };

    /**
     * Set Beach Visibility based on state
     * @func setViewVisibility
     */
    self.setViewVisibility = function () {
        self.viewVisible() === true ? self.viewVisible(false) : self.viewVisible(true);
        self.filteredPlaces();
    };

    /**
     * Set Restaurant Visibility based on state
     * @func setRestaurantVisibility
     */
    self.setRestaurantVisibility = function () {
        self.restaurantVisible() === true ? self.restaurantVisible(false) : self.restaurantVisible(true);
        self.filteredPlaces();
    };

}