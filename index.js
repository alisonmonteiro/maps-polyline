function mapsPolyline(options) {
  "use strict";

  let map;
  let markers = [];
  let polylines = [];

  function getLineSymbol(color) {
    return {
      path: 'M 0,-1 0,1',
      fillColor: color,
      strokeColor: color,
      strokeOpacity: 1,
      scale: 3,
    };
  }

  function loadMarkersAndLines() {
    const pinsList = getPins();

    pinsList
      .then(pins => JSON.parse(pins))
      .then(pins => pins['data'])
      .then(pins => {
        if (!pins) {
          console.error('No data specified');
          return false;
        }

        cleanUpLines();
        cleanUpMarkers();

        pins.map(pin => {
          const items = pin.items;
          const color = pin.color;

          addLine(items, color);

          items.map(pin => {
            addMarker(pin, color);
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  function addLine(items, color) {
    const coordinates = items.map(item => item.position);
    const polyline = new google.maps.Polyline({
      map: map,
      path: coordinates,
      strokeOpacity: 0,
      icons: [{
        icon: getLineSymbol(color),
        offset: '0',
        repeat: '13px'
      }]
    });

    polylines.push(polyline);
  }

  function addMarker(pin, color) {
    const marker = new google.maps.Marker({
      map: map,
      id: pin.id,
      position: pin.position,
      animation: google.maps.Animation.DROP,
      icon: {
        scale: 1,
        fillOpacity: 1,
        strokeWeight: 0,
        fillColor: color,
        anchor: new google.maps.Point(0, 0),
        path: "M-6,0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0",
      }
    });

    marker.addListener('click', () => {
      // TODO: Callback
    })
  }

  function cleanUpMarkers() {
    if (markers.length > 0) {
      markers.map(marker => {
        marker.setMap(null);
      });
    }

    markers = [];
  }

  function cleanUpLines() {
    if (polylines.length > 0) {
      polylines.map(polyline => {
        polyline.setMap(null);
      })
    }
  }

  function getPins() {
    // temp
    return new Promise((resolve, reject) => {
      let jsonData = '{"data":[{"code":"1","color":"#5069b9","items":[{"id":1,"position":{"lat":"-22.9127036","lng":"-43.2261661"}},{"id":2,"position":{"lat":"-22.9846670","lng":"-43.1985932"}},{"id":3,"position":{"lat":"-22.9517417","lng":"-43.2108805"}}]},{"code":"2","color":"#ff0000","items":[{"id":8,"position":{"lat":"-22.9492586","lng":"-43.1545757"}},{"id":9,"position":{"lat":"-22.9697777","lng":"-43.1868592"}}]}]}';

      setTimeout(() => {
        resolve(jsonData);
      }, 1000)
    });
  }

  loadMarkersAndLines();
}

mapsPolyline();

HTMLElement.prototype.mapsPolyline = HTMLElement.prototype.mapsPolyline || function(options) {
  return mapsPolyline(options);
}
