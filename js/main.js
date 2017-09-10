function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: -9.1191427, lng: -77.0349046 },
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
    });

    var geocoder = new google.maps.Geocoder;

    function find() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(functionExito, functionError);

        }
    }
    document.getElementById("findMe").addEventListener("click", find);
    var latit, longi;
    var functionExito = function (position1) {
        latit = position1.coords.latitude;
        longi = position1.coords.longitude;
        var myUbication = new google.maps.Marker({
            position: { lat: latit, lng: longi },
            animation: google.maps.Animation.DROP,
            map: map
        });
        var myDirection = new google.maps.LatLng(latit, longi);
        geocodeLatLng(geocoder, map, latit, longi);
        map.setZoom(15);
        map.setCenter({ lat: latit, lng: longi });
    }
    var functionError = function (error) {
        alert("Tenemos un inconveniente con encontrar tu ubicación");
    }
    directionsDisplay.setMap(map);

    //AUTOCOMPLETE TEXTBOX DESTINY
    /*var inputOrigin = document.getElementById("origin");
    var autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);*/
    //AUTOCOMPLETE TEXTBOX DESTINY
    var input = document.getElementById("destiny");
    var autocomplete = new google.maps.places.Autocomplete(input);

    //TRACE ROUTE
    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('origin').addEventListener('change', onChangeHandler);
    document.getElementById('destiny').addEventListener('change', onChangeHandler);
}

//function to change coordinates to address
function geocodeLatLng(geocoder, map, latit, longi) {
    var latlng = { lat: parseFloat(latit), lng: parseFloat(longi) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                document.getElementById('origin').value = results[1].formatted_address;
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

//Function that traces de route
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById('origin').value,
        destination: document.getElementById('destiny').value,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
