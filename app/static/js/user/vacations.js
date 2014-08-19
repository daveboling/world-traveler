/* global initMap, addMarker, getPositions */

(function(){
  'use strict';

  $(document).ready(function(){
    initMap(36, -86, 10);

    //Data for Google Maps pins
    var data = getPositions();
    data.forEach(function(a){
      addMarker(a.lat, a.lng, a.name);
    });
  });


})();

