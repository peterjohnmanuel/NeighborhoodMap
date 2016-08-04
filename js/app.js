'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: app.js
 * Description : Holds relevant js functionality of the application.
 */


/** Global Variables */
var map;

/** Functions */

$(function () {

    function initMap() {

        map = new google.maps.Map( $('#map'), {
            center: { lat: 40.7413549, lng: -73.9980244 },
            zoom: 13
        });

    }

});