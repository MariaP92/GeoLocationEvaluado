let chargeMap = {
    items: {
        directionService: new google.maps.DirectionsService,
        directionsDisplay: new google.maps.DirectionsRenderer,
        map: new google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: { lat: -9.1191427, lng: -77.0349046 },
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        }),
       // geocoder: new google.maps.Geocoder
    },

    initMap: function () {
        function find() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(functionExito, functionError);

            }
        }
        document.getElementById("findMe").addEventListener("click", find);
        let latit, longi;
        let functionExito = function (position1) {
            latit = position1.coords.latitude;
            longi = position1.coords.longitude;
            let myUbication = new google.maps.Marker({
                position: { lat: latit, lng: longi },
                animation: google.maps.Animation.DROP,
                map: map
            });
            let myDirection = new google.maps.LatLng(latit, longi);
            items.map.setZoom(15);
            items.map.setCenter({ lat: latit, lng: longi });
        }
        let functionError = function (error) {
            alert("Tenemos un inconveniente con encontrar tu ubicación");
        }
        directionsDisplay.setMap(items.map);

        //AUTOCOMPLETE TEXTBOX DESTINY
        let inputOrigin = document.getElementById("origin");
        let autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
        //AUTOCOMPLETE TEXTBOX DESTINY
        let input = document.getElementById("destiny");
        let autocomplete = new google.maps.places.Autocomplete(input);

        //TRACE ROUTE
        let onChangeHandler = function () {
            calculateAndDisplayRoute(items.directionsService, items.directionsDisplay);
        };
        document.getElementById('origin').addEventListener('change', onChangeHandler);
        document.getElementById('destiny').addEventListener('change', onChangeHandler);
    },

    calculateAndDisplayRoute: function (directionsService, directionsDisplay) {
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

}

$(document).ready(chargeMap.initMap);