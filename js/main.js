var x = document.getElementById("location");
var w3w = document.getElementById("w3w");
var coordinates = document.getElementById("coordinates");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "<h2> Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude +
    "</h2>";
  getW3WAddress(position.coords.latitude, position.coords.longitude);
  getGrid(position);
}

function getW3WAddress(lat, lng) {
  //Option with catch
  var textURL = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${lat},${lng}&language=en&key=UAT9QR8X`;
  fetch(textURL)
    .then(async r => {
      var x = await r.json();
      console.log(x);
      console.log(x.words);
      w3w.innerHTML = `<h2> <a href="${x.map}"> ///${x.words} </a> </h2>`;
    })
    .catch(e => console.error("Boo..." + e));
}

function getCoordinates() {
  var words = document.getElementById("three_words_input").value;
  console.log(words);
  var textURL = `https://api.what3words.com/v3/convert-to-coordinates?words=${words}&language=en&key=UAT9QR8X`;
  console.log(textURL);
  fetch(textURL)
    .then(async r => {
      var x = await r.json();
      coordinates.innerHTML = `<h2>${x.coordinates.lat}, ${x.coordinates.lng} </h2>`;
    })
    .catch(e => console.error("Boo..." + e));
}

function getGrid(position) {
  var southWestLat = position.coords.latitude - 0.006;
  var southWestLng = position.coords.longitude - 0.006;
  var northEastLat = position.coords.latitude + 0.006;
  var northEastLng = position.coords.longitude + 0.006; 
  console.log(southWestLat);
  what3words.api.gridSectionGeoJson({
    southwest: { lat: southWestLat, lng: southWestLng },
    northeast: { lat: northEastLat, lng: northEastLng }
  })
  .then(function(response) {
    console.log("[gridSection]", response);
  }
);
}
