'use strict';
/**
 * Author : Peter John Manuel
 * Date Created : 04/08/2016
 * File: map.js
 * Description : Methods for google maps api.
 */

var map;

var placeMarkers = [
    fontawesome.markers.EXCLAMATION_CIRCLE,
    fontawesome.markers.UMBRELLA,
    fontawesome.markers.CUTLERY,
    fontawesome.markers.HOTEL,
    fontawesome.markers.STREET_VIEW
];

/** Functions */

/**
 * Callback function used when initializing the map and google map api.
 * @func initMap
 */
function initMap() {

    var customStyledMapType = new google.maps.StyledMapType(customMapStyle);

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.2002806, lng: 18.3726442 },
        zoom: 13,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'customStyleMap']
        }
    });

    map.mapTypes.set('customStyleMap', customStyledMapType);
    displayedPlaces.initializeMarkers();

}

/**
 * Callback function if an error has occurred when loading google maps.
 * @func googleMapsError
 */
function googleMapsError() {

    toastr.error('Error occurred while loading google maps.', 'Google Maps Error');
    document.getElementById('navbar-button').style.visibility = 'hidden';
}


/**
 * Create an icon based on the place 
 * 
 * @func makeMarkerIcon
 * @param place
 * @param markerColor
 */
function makeMarkerIcon(place, markerColor) {

    var placeIcon;

    switch (place.constructor.name) {
        case 'Hotel': placeIcon = 3;
            break;
        case 'Beach': placeIcon = 1;
            break;
        case 'View': placeIcon = 4;
            break;
        case 'Restaurant': placeIcon = 2;
            break;
    }

    var icon = {
        path: placeMarkers[placeIcon],
        scale: 0.3,
        strokeWeight: 0.2,
        strokeColor: 'black',
        strokeOpacity: 1,
        fillColor: markerColor,
        fillOpacity: 0.7
    };

    return icon;
};


/** 
 * Checks and sees if there are wikipedia entries found for the location.
 * @func getWikipediaEntries
 * @param place
*/
function getWikipediaEntries(place) {

    /** set wikipedia timeout */
    var wikiRequestTimeout = setTimeout(function () {
        toastr.error('An error occurred getting data from wikipedia.', 'Wikipedia Error');
    }, 8000);

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + place.marker.title + "&text=" + place.city + "&format=json&callback=wikiCallback",
        dataType: "jsonp",
    }).done(function (data) {

        /** Only get the first entry from wikipedia. */
        var articles = data[1];
        var result;

        if (articles.length != 0)
            result = "<li><a class='wiki-entry fa fa-wikipedia-w' href='https://en.wikipedia.org/wiki/" + articles[0] + "'>  " + articles[0] + "<a></li>";
        else
            result = "No wikipedia entries found.";

        $("#wikipedia").append(result);


    }).fail(function (data) {
        toastr.error('An error occurred getting data from wikipedia.', 'Wikipedia Error');
    });

    /**Clear timeout after call */
    clearTimeout(wikiRequestTimeout);

};

/** 
 * Get weather entry based on the location.
 * @func getWeatherEntryForLocation
 * @param place
*/
function getWeatherEntryForLocation(place) {

    var openWeatherRequestTimeout = setTimeout(function () {
        toastr.error('An error occurred getting data from open weather map.', 'Open Weather Map Error');
    }, 8000);

    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + place.location.lat + '&lon=' + place.location.lat + '&APPID=c83925a9755f965ddc1faa179431f8ea';
    $.ajax({
        url: url,
        dataType: 'json'

    }).done(function (data) {

        var weather = data.weather[0];

        var icon = '<i class="fa fa-cloud"></i> ';

        $('#weather').append(icon, weather.main);

    }).fail(function (data) {
        toastr.error('An error occurred getting data from open weather map.', 'Open Weather Map Error');
    });

    /**Clear timeout after call */
    clearTimeout(openWeatherRequestTimeout);

};



/** Google Map Style */
var customMapStyle = [{
    featureType: 'water',
    stylers: [{ color: '#19a0d8' }]
},
    {
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#ffffff' },
            { weight: 1 }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'labels.text.file',
        stylers: [
            { color: '#e85113' },
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#efe9e4' },
            { lightness: -40 },
        ]
    },
    {
        featureType: 'transit.station',
        stylers: [
            { weight: 9 },
            { hue: '#e85113' },
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
            { visibility: 'off' }
        ]
    }
]