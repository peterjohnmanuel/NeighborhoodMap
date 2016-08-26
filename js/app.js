'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: app.js
 * Description : Holds relevant js functionality of the application.
 */

/** Global Variables */
var displayedPlaces = new PlaceViewModel();
var mapOptions = new MapViewModel();

ko.applyBindings(displayedPlaces, document.getElementById('placeView'));
ko.applyBindings(mapOptions, document.getElementById('mapView'));

displayedPlaces.initPlaces();

$(function () {

    var body = $('body');
    var navToggleBtn = $('.nav-toggle-btn');
    var navbarTop = $('.navbar-top');

    /** Expand side bar when toggled. */
    navToggleBtn.on('click', function (e) {
        body.toggleClass('active-nav');
    });


});