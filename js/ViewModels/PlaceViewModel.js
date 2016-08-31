
/** @func PlaceViewModel 
 * View model for Place functionality
*/
function PlaceViewModel() {

    var self = this;

    var largerInfoWindow = null;
    var bounds = null;
    var wikiRequestTimeout = null;

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
    self.filteredPlaces = ko.computed(function () {
        return ko.utils.arrayFilter(self.places(), function (place) {

            var result = place.title.toLowerCase().indexOf(self.searchPlaces().toLowerCase()) > -1;

            if (place.marker !== null)
                place.marker.setVisible(result);

            return result;
        });
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
            function getStreetView(data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                    var nearStreetViewLocation = data.location.latLng;
                    var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, place.marker.position);


                    infoWindow.setContent('<div>' + place.marker.title + '</div><div id="pano"></div><div id="wikipedia"></div>');
                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: heading,
                            pitch: 20
                        }
                    };

                    var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
                }
                else {
                    infoWindow.setContent('<div>' + place.marker.title + '</div>' + '<div>No Street View Found</div><ul id="wikipedia"></ul>');
                }
            }


            wikiRequestTimeout = setTimeout(function () {
                alert("Failed to load wikipedia resources.");
                //$wikiElem.text("failed to get wikipedia resources");
            }, 8000);

            getWikipediaEntries(place);

            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(place.marker.position, radius, getStreetView);
            // Open the infowindow on the correct marker.
            infoWindow.open(map, place.marker);


        }

    }


    /** 
     * Checks and sees if there are wikipedia entries found for the location.
     * @func getWikipediaEntries
    */
    function getWikipediaEntries(place) {



        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + place.marker.title + "&text=" + place.city + "&format=json&callback=wikiCallback",
            dataType: "jsonp",
        }).done(function (data) {

            console.log(data);
            var articles = data[1];
            var items = []
            var urlString;

            for (var i = 0; i < articles.length; i++) {
                urlString = articles[i].replace(/ /g, "_")
                items.push("<li><a class='wiki-entry fa fa-wikipedia-w' href='https://en.wikipedia.org/wiki/" + articles[i] + "'>  " + articles[i] + "<a></li>");
            }

            $("#wikipedia").append(items);

            clearTimeout(wikiRequestTimeout);
        }).fail(function (data) {
            console.log(data);
        });
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


    self.setHotelVisibility = function () {
        if (self.hotelVisible() === true) {
            self.hotelVisible(false);           
        }
        else if (self.hotelVisible() === false) {
            self.hotelVisible(true);
        }

    }


}