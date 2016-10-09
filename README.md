# Maps Polyline

> Create polylines on your map easily.

![My map](https://raw.githubusercontent.com/alisonmonteiro/maps-polyline/master/images/map.png)

### Usage

```javascript
// Your map configs.
const options = {};
const element = document.getElementById('map');
const map = new google.maps.Map(element, options);

const jsonData = 'YOUR_JSON_HERE';

element.mapsPolyline(map, jsonData);
```

JSON Example:

```json
{
  "data": [
    {
      "code": 1,
      "color": "#5069b9",
      "items": [
        {
          "id": 1, "position": { "lat":"-22.9127036", "lng":"-43.2261661" }
        },
        {
          "id": 2, "position": { "lat":"-22.9846670", "lng":"-43.1985932" }
        },
        {
          "id": 3, "position": { "lat":"-22.9517417", "lng":"-43.2108805" }
        }
      ]
    },
    {
      "code": 2,
      "color": "#ff0000",
      "items": [
        {
          "id": 8, "position": { "lat":"-22.9492586", "lng":"-43.1545757" }
        },
        {
          "id": 9, "position": { "lat":"-22.9697777", "lng":"-43.1868592" }
        }
      ]
    }
  ]
}

```
