var map = L.map("map").setView([40.89, -73.94], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidGljLXRhYzE2MDIiLCJhIjoiY2wwOGlhMTlzMDM3djNibjB3ZzJlYmZoMCJ9.kaVgT4-2au8-griivVqoZQ",
  }
).addTo(map);
var circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

var ip = "8.8.8.8";
var api_key = "at_4X5YajEddc8xb3o6s5KsxpJ9gigQl";
$("button").click(function (e) {
  e.preventDefault();
  ip = $("#ip-input").val();
  //console.log(ip);
  $.ajax({
    url: "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_4X5YajEddc8xb3o6s5KsxpJ9gigQl&ipAddress=8.8.8.8",
    data: { apiKey: api_key, ipAddress: ip },
    success: function (data) {
      console.log(data);
      $("#ip").text(data.ip);
      $("#isp").text(data.isp);
      $("#location").text(
        data.location.city +
          ", " +
          data.location.region +
          ", " +
          data.location.postalCode
      );
      $("#time").text("UTC " + data.location.timezone);
      $("#ip-input").val("");
      map.setView([data.location.lat, data.location.lng], 12);
      circle.remove();
      circle = L.circle([data.location.lat, data.location.lng], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);
    },
  });
});
