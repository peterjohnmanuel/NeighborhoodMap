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

    function initMap() {

        map = new google.maps.Map( document.getElementById('map'), {
            center: { lat: -34.16149, lng: 18.4633561 },
            zoom: 12
        });

    }


$(function () {



});