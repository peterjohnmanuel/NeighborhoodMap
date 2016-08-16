'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: app.js
 * Description : Holds relevant js functionality of the application.
 */


/** Global Variables */
var map;
var markers = [];


/** Functions */

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.2002806, lng: 18.3726442 },
        zoom: 13,
        mapTypeControl: false
    });

}


$(function () {

    var body = $('body');
    var navToggleBtn = $('.nav-toggle-btn');
    var navbarTop = $('.navbar-top');

    navToggleBtn.on('click', function (e) {

        body.toggleClass('active-nav');
        // navbarTop.toggleClass('');
        e.preventDefault();
    });


});