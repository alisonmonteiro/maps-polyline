# Maps Polyline

> Create polylines on your map easily.

![My map](https://raw.githubusercontent.com/alisonmonteiro/maps-polyline/master/images/map.png)

### Usage

```javascript
const polyline = require('maps-polyline');

const element = document.getElementById('map');
const map = new google.maps.Map(element, options); // your map with it's config
const data = {}; // you can use a JSON or an Object

polyline(map, data);
```

See a [JSON Example](https://github.com/alisonmonteiro/maps-polyline/blob/master/maps-example.json)
