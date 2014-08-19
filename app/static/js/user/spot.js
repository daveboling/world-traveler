/* global initMap, addMarker */
(function(){
  'use strict';

  $(document).ready(function(){
    var lng = $('#lng').attr('data-lng'),
        lat = $('#lat').attr('data-lat'),
       name = $('#name').attr('data-name');

    //Make map with these coordinates
    initMap(lat, lng, 9);

    //Add a map marker to that coordinate
    addMarker(lat,lng,name);

  });


})();

