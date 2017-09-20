(function() {
"use strict";
var map, southWest, northEast;

function unproject(coord) {
    return map.unproject(coord, map.getMaxZoom());
}

map = L.map("map", {
  minZoom: 0,
  maxZoom: 7,
  crs: L.CRS.Simple
}).setView([1, 1], 3);

southWest = unproject([0, 32768]);
northEast = unproject([32768, 0]);

var markertest = unproject([13440, 9472]);
var markertest2 = unproject([16640, 12288]);


console.log(markertest);
console.log(markertest2);
var testbounds =  L.bounds([markertest.lat, markertest.lng], [markertest2.lat, markertest2.lng]);

var idunno = testbounds.getCenter();
console.log(idunno);

map.setView([idunno.x, idunno.y], 5);

var latlngs = [];

latlngs.push([markertest.lat, markertest.lng]);
latlngs.push([markertest2.lat, markertest2.lng]);

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

L.marker(markertest).addTo(map);
L.marker(markertest2).addTo(map);


L.tileLayer("https://tiles{s}.guildwars2.com/1/1/{z}/{x}/{y}.jpg", {
  minZoom: 0,
  maxZoom: 7,
  continuousWorld: true,
  subdomains: [1, 2, 3, 4 ]
}).addTo(map);


}());
