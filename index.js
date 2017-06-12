(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS-like
    exports = module.exports = factory(root, document);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define('mapsPolyline', factory);
  } else {
    // Browser globals (root is window)
    root.mapsPolyline = factory(root, document);
  }
})(typeof window === 'undefined' ? this : window, function (window, document) {
  "use strict";

  function mapsPolyline(map, polylinesData, options) {
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
      const coordinates = items.map(item => {
        const lat = parseFloat(item.position.lat);
        const lng = parseFloat(item.position.lng);

        return { lat, lng };
      });

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
      const position = {
        lat: parseFloat(pin.position.lat),
        lng: parseFloat(pin.position.lng)
      };

      const marker = new google.maps.Marker({
        map: map,
        id: pin.id,
        position: position,
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

      marker.onclick = () => {
        if (options.callback && typeof options.callback === 'function') {
          options.callback();
        }
      };
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
        let jsonData = polylinesData;

        setTimeout(() => {
          resolve(jsonData);
        }, 1000)
      });
    }

    loadMarkersAndLines();
  }

  HTMLElement.prototype.mapsPolyline = HTMLElement.prototype.mapsPolyline || function(mapObject, polylinesData, options) {
    return mapsPolyline(mapObject, polylinesData, options);
  }

  return mapsPolyline;
});
