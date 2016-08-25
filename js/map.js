'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: map.js
 * Description : Methods for google maps api.
 */

var map;
/** Functions */

/**
 * Callback function used when initializing the map.
 * @func initMap
 */
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.2002806, lng: 18.3726442 },
        zoom: 13,
        mapTypeControl: false
    });

    displayedPlaces.initializeMarkers();

}

/**
 * Callback function if an error has occurred when loading google maps.
 * @func googleMapsError
 */
function googleMapsError() {

    console.log("Error occurred while loading google maps.");

    //$(".nav-toggle-btn").visible(false);

    document.getElementsByClassName("nav-toggle-btn").style.visibility = "hidden";

}