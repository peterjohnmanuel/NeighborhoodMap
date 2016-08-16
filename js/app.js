'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: app.js
 * Description : Holds relevant js functionality of the application.
 */

/** Global Variables */
var displayedPlaces = new PlaceViewModel();

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