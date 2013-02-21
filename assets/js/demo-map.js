function selectCity(index, updateAccordion) {
    if (updateAccordion) {
        $( "#accordion-map" ).accordion("option", "active", index);
    }
    $('#gmap3').gmap3({
        exec: {
            name: "marker",
            all:"true",
            func: function(value){
                // data.object is the google.maps.Marker object
                if (value.data.index === index) {
                    value.object.setIcon("http://maps.google.com/mapfiles/marker_green.png");
                } else {
                    value.object.setIcon("http://maps.google.com/mapfiles/marker.png");
                }
            }
        }
    });
}

$(function(){
    //##### Accordion with gmap3

    $( "#accordion-map" ).accordion({
        header: "h3",
        activate: function(event, ui) {
            // index / 2 because of the 2 elements by set (h3 + div)
            selectCity(ui.newHeader.index() / 2);
        }
    });

    $('#gmap3').gmap3({
        map:{
            options:{
                center:[46.578498,2.457275],
                zoom: 5
            }
        },
        marker:{
            values:[
                {latLng:[48.8620722, 2.352047], data: {index: 0},
                    options:{icon: "http://maps.google.com/mapfiles/marker_green.png"}
                },
                {address:"86000 Poitiers, France", data: {index: 1}},
                {address:"66000 Perpignan, France", data: {index: 2}}
            ],
            options:{
                draggable: false
            },
            events:{
                click: function (marker, event, context) {
                    selectCity(context.data.index, true);
                }
            }
        }
    });
    //######## Tabs gmap3
    // invoque google maps on 2 divs
    $(".gmap3").gmap3({
        map: {
            options: {
                zoom: 6,
                center: [49.265984, -123.127491],
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        }
    });

    // Append the meteo layer on weather map
    var map = $("#weather").gmap3("get");

    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    weatherLayer.setMap(map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(map);


    // force maps to refresh on show
    $("#tabs").tabs({
        activate: function(event, ui) {
            if (ui.newPanel.hasClass("gmap3")) {
                ui.newPanel.gmap3({trigger: "resize"});
            }
        }
    });
});