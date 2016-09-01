
/** 
 * Functions relating to the map view model class.
 * @class MapViewModel
*/
function MapViewModel() {


    self.roadMapActive = ko.observable(true);
    self.satelliteActive = ko.observable(false);
    self.terrainActive = ko.observable(false);
    self.hybridActive = ko.observable(false);
    self.customMapActive = ko.observable(false);

    self.setMapToRoadMap = function () {
        setMapsFalse();
        map.setMapTypeId('roadmap');
        self.roadMapActive(true);
    }

    self.setMapToSatellite = function () {
        setMapsFalse();
        map.setMapTypeId('satellite');
        self.satelliteActive(true);
    }

    self.setMapToTerrain = function () {
        setMapsFalse();
        map.setMapTypeId('terrain');
        self.terrainActive(true);
    }

    self.setMapToHybrid = function () {
        setMapsFalse();
        map.setMapTypeId('hybrid');
        self.hybridActive(true);
    }

    self.setCustomMapStyle = function () {
        setMapsFalse();
        map.setMapTypeId('customStyleMap');
        self.customMapActive(true);
    }

    function setMapsFalse() {
        self.roadMapActive(false);
        self.satelliteActive(false);
        self.terrainActive(false);
        self.hybridActive(false);
        self.customMapActive(false);
    }

}