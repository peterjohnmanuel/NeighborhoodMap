
/** 
 * Functions relating to the map view model class.
 * @class MapViewModel
*/
function MapViewModel() {

    self.setMapToRoadMap = function () {
        map.setMapTypeId('roadmap');
    }

    self.setMapToSatellite = function () {
        map.setMapTypeId('satellite');
    }

    self.setMapToTerrain = function () {
        map.setMapTypeId('terrain');
    }

    self.setMapToHybrid = function () {
        map.setMapTypeId('hybrid');
    }

    self.setMapStyle = function () {
        map.setOptions(styles1);
    }

}