'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: map.js
 * Description : Methods for google maps api.
 */



var map;
var markers = [];





/** Functions */


/**
 * Callback function used when initializing the map.
 * @func initMap
 */
function initMap() {

    ko.applyBindings(displayedPlaces);
    displayedPlaces.initPlaces();

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.2002806, lng: 18.3726442 },
        zoom: 13,
        mapTypeControl: false
    });

    InitializeMarkers();

}

/**
 * Create the markers for the locations.
 * @func InitializeMarkers
 */

function InitializeMarkers(){

        /** Creating a info windows */
    var largerInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();


    /**The following group uses the location array to create an array of markers on initialize.*/
    for (var i = 0; i < displayedPlaces.places().length; i++) {

        /** Get the position from the location array */
        var position = displayedPlaces.places()[i].location;
        var title = displayedPlaces.places()[i].title;

        /**Create a marker per location, and put into markers array */
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        /** Push the marker to our array of markers */
        markers.push(marker);

        /** Create an onclick event to open an infowindow at each marker */
        marker.addListener('click', function () {
            populateInfoWindow(this, largerInfowindow);
        });

        /** Extend the boundaries of the map for each marker */
        bounds.extend(marker.position);

        map.fitBounds(bounds);
    }

}
