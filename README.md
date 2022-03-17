# Installation

```bash
yarn add @antipodes-medical/google-maps
```

Et dans le Javascript pour que le custom element `<google-maps>` se définisse dans le DOM. :

```javascript
import '@antipodes-medical/google-maps'
```

# Usage

```html
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
></google-maps>
```

Il vous faudra remplir `GOOGLE_MAP_API_KEY` pour que la `Google Map` fonctionne correctement. <br />
Généralement le `.env` devrait avoir cela, il est donc possible de faire cela :

 ```diff
<google-maps
-               api-key="GOOGLE_MAP_API_KEY"
+               api-key="{{ function('getenv', 'GOOGLE_MAPS_API_KEY') }}"
                latitude="37.78"
                longitude="-122.4"
></google-maps>
```

`GOOGLE_MAPS_API_KEY` étant le nom de la constante définie dans le fichier d'environnement.

## Configuration

La google map est configurable a l'aide des attributs HTML.

### Infowindow

Pour avoir une infowindow a un certain point, vous pouvez ajouter à l'intérieur de la `<google-maps>` le code. <br />
Par exemple :

```html
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
>
  <div class="infowindow"> 
      <div class="infowindow__title">
        <p>Le titre de mon infowindow</p>
      </div>
      <div class="infowindow__content">
        <p>Le contenu de mon infowindow.</p>
      </div>
  </div>
</google-maps>
```

### Markers

Il est possible d'ajouter plusieurs `markers` sur une google map.<br />
En procédant comme suit :

```html
<google-maps 
  api-key="GOOGLE_MAP_API_KEY"
  markers='[
  {
    "latitude": 48.87,
    "longitude": 2.32,
    "infowindow": "<div class=\"infowindow\">...</div>
  },
  {
    "latitude": 45.514,
    "longitude": 1.367,
    "infowindow": "<div class=\"infowindow\">...</div>
  }
  ]'></google-maps>
```

#### Couleur

Il est possible de customiser les markers. <br/>
Pour simplement modifier la couleur :

```diff
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
+               marker-color="#F00"
></google-maps>
```

#### Icône

Pour modifier l'icône :

```diff
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
+               marker-icon="https://domain.com/dist/images/pin.svg"
></google-maps>
```

### Zoom

Il est possible de modifier le zoom sur la `Google Map` :

```diff
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
+               zoom="12"
></google-maps>
```

### Style

Par défaut, le style de la `Google Map` est en noir et blanc. <br/>
Il est possible de modifier cela, comme cela par exemple :

```html
<google-maps
                api-key="GOOGLE_MAP_API_KEY"
                latitude="37.78"
                longitude="-122.4"
                map-options='{"styles": [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]}'
></google-maps>
```
