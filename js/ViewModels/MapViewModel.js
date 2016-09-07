
/** 
 * Functions relating to the map view model class.
 * @class MapViewModel
*/
function MapViewModel() {

    /** knockout observables */
    self.roadMapActive = ko.observable(true);
    self.satelliteActive = ko.observable(false);
    self.terrainActive = ko.observable(false);
    self.hybridActive = ko.observable(false);
    self.customMapActive = ko.observable(false);

    /** 
     * Set map to road map 
     * @func setMapToRoadMap
     * */
    self.setMapToRoadMap = function () {
        setMapsFalse();
        map.setMapTypeId('roadmap');
        self.roadMapActive(true);
    };

    /** 
     * Set map to satellite map 
     * @func setMapToSatellite
     * */
    self.setMapToSatellite = function () {
        setMapsFalse();
        map.setMapTypeId('satellite');
        self.satelliteActive(true);
    };

    /** 
     * Set map to terrain map 
     * @func setMapToTerrain
     * */
    self.setMapToTerrain = function () {
        setMapsFalse();
        map.setMapTypeId('terrain');
        self.terrainActive(true);
    };

    /** 
     * Set map to hybrid map 
     * @func setMapToHybrid
     * */
    self.setMapToHybrid = function () {
        setMapsFalse();
        map.setMapTypeId('hybrid');
        self.hybridActive(true);
    };

    /** 
     * Set map to custom style map 
     * @func setCustomMapStyle
     * */
    self.setCustomMapStyle = function () {
        setMapsFalse();
        map.setMapTypeId('customStyleMap');
        self.customMapActive(true);
    };

    /**
     * Set all map obervables to false 
     * @func setMapsFalse
     * */
    function setMapsFalse() {
        self.roadMapActive(false);
        self.satelliteActive(false);
        self.terrainActive(false);
        self.hybridActive(false);
        self.customMapActive(false);
    }

}