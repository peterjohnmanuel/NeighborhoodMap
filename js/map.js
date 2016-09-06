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


/** This function takes in a COLOR, and then creates a new marker icon of theat color.
 * The icon will be 21 px wide by 24 high, have an origin of 0, 0 and be anchored at 10,34
 */
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(34, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34)
    )
    return markerImage;
};


/** 
 * Checks and sees if there are wikipedia entries found for the location.
 * @func getWikipediaEntries
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