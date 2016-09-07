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

/** Apply the bindings to relevant views */
ko.applyBindings(displayedPlaces, document.getElementById('placeView'));
ko.applyBindings(mapOptions, document.getElementById('mapView'));

/** Initialize the displayedPlaces function */
displayedPlaces.initPlaces();

/** JQuery functions */
$(function () {

    /**
     * toastr options for pop up messages.
     */

    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 200;
    toastr.options.closeEasing = 'swing';
    toastr.options.showMethod = 'slideDown';
    toastr.options.closeMethod = 'slideUp';

    /**
     * variables for menu
     */
    var body = $('body');
    var navToggleBtn = $('.nav-toggle-btn');
    var navbarTop = $('.navbar-top');

    /** Expand side bar when toggled. */
    navToggleBtn.on('click', function (e) {
        body.toggleClass('active-nav');
    });


});