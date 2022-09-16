{
  let initCalled;
  const callbackPromise = new Promise(r => window.__initGoodMap = r);

  function loadGoogleMaps(apiKey)
  {
      if (!initCalled) {
          const script = document.createElement('script');
          script.async = true;
          script.defer = true;
          script.src = `https://maps.googleapis.com/maps/api/js?${apiKey ? `key=${apiKey}&` : ''}callback=__initGoodMap`;
          document.head.appendChild(script);
          initCalled = true;
      }
      return callbackPromise;
  }

  customElements.define('google-maps', class extends HTMLElement {
      constructor()
      {
          super();

          this.infowindowContent = this.innerHTML.trim();
          this.map = null;
          this.apiKey = null;
          this.zoom = null;
          this.latitude = null;
          this.longitude = null;
          this.markerIcon = null;
          this.markerColor = null;
          this.markers = null;
          this.mapOptions = {
              styles: this._blackAndWhiteStyle()
          };
      }

      static get observedAttributes()
      {
          return [
              'api-key',
              'zoom',
              'latitude',
              'longitude',
              'markers',
              'marker-icon',
              'marker-color',
              'map-options'
          ];
      }

      attributeChangedCallback(name, oldVal, val)
      {
          switch (name) {
              case 'api-key':
                  this.apiKey = val;
                  break;
              case 'zoom':
              case 'latitude':
              case 'longitude':
                  this[name] = parseFloat(val);
                  break;
              case 'marker-icon':
                  this.markerIcon = val;
                  break;
              case 'marker-color':
                  this.markerColor = val;
                  break;
              case 'map-options':
                  this.mapOptions = JSON.parse(val);
                  break;
              case 'markers':
                  this.markers = JSON.parse(val);
                  break;
          }
      }

      connectedCallback()
      {
          loadGoogleMaps(this.apiKey).then(() => {
              if (!this.mapOptions.zoom) {
                  this.mapOptions.zoom = this.zoom || 14;
              }
              if (!this.mapOptions.center && !this.markers) {
                  this.mapOptions.center = {
                      lat: this.latitude || 0,
                      lng: this.longitude || 0
                  };
              } else {
                  this.mapOptions.center = {
                      lat: this.markers[0].latitude || 0,
                      lng: this.markers[0].longitude || 0
                  };
              }

              const mapOptionsDefault = {
                  mapTypeControl: false,
                  streetViewControl: false
              };

              this.map = new google.maps.Map(this, {...mapOptionsDefault, ...this.mapOptions});

              if (!this.markerIcon) {
                  this.markerIcon = {
                    path: "M30.7007 9.95562C30.5382 9.42199 30.2083 8.85339 29.9642 8.35557C27.0436 2.20444 20.6621 0 15.5094 0C8.61149 0 1.01429 4.05345 0 12.4086V14.1155C0 14.1868 0.0280156 14.8267 0.0678104 15.1468C0.636399 19.1286 4.22165 23.3605 6.89926 27.3423C9.77998 31.6084 12.7692 35.8051 15.7306 40C17.5567 37.2625 19.3763 34.489 21.1608 31.8223C21.6471 31.0397 22.2117 30.2576 22.6985 29.5107C23.0231 29.0133 23.643 28.5159 23.9262 28.0532C26.8069 23.4312 31.4435 18.7736 31.4435 14.1867V12.3023C31.4436 11.8051 30.7403 10.0628 30.7007 9.95562ZM15.6357 18.5247C13.608 18.5247 11.3886 17.6362 10.2932 15.1824C10.13 14.7918 10.1431 14.0091 10.1431 13.9374V12.8351C10.1431 9.70703 13.1739 8.28452 15.8105 8.28452C19.0565 8.28452 21.567 10.5604 21.567 13.405C21.567 16.2496 18.8816 18.5247 15.6357 18.5247Z",
                    fillColor: this.markerColor ?? '#000',
                    fillOpacity: 1,
                    anchor: new google.maps.Point(0, 0),
                    strokeWeight: 0,
                    scale: 1
                  };
              }

              if (!this.markers) {
                  this.marker = new google.maps.Marker({
                      position: {
                          lat: this.latitude || 0,
                          lng: this.longitude || 0
                      },
                      map: this.map,
                      icon: this.markerIcon
                  });

                  this.marker.map = this.map;

                  if (this.infowindowContent !== '') {
                      this.infowindow = new google.maps.InfoWindow({
                          content: this.infowindowContent
                      });
                      this.infowindow.open({
                          map: this.map,
                          anchor: this.marker,
                          shouldFocus: false
                      });
                      google.maps.event.addListener(
                          this.marker,
                          'click',
                          (
                              () => {
                                  this.infowindow.open(this.map, this.marker);
                              }
                          )
                      );
                  }
              } else {
                  this.markers.map(marker => {
                      const LatLng = new google.maps.LatLng(marker.latitude, marker.longitude);
                      const markerPoint = new google.maps.Marker({
                          position: LatLng,
                          map: this.map,
                          icon: marker.color 
                          ? {
                            path: "M30.7007 9.95562C30.5382 9.42199 30.2083 8.85339 29.9642 8.35557C27.0436 2.20444 20.6621 0 15.5094 0C8.61149 0 1.01429 4.05345 0 12.4086V14.1155C0 14.1868 0.0280156 14.8267 0.0678104 15.1468C0.636399 19.1286 4.22165 23.3605 6.89926 27.3423C9.77998 31.6084 12.7692 35.8051 15.7306 40C17.5567 37.2625 19.3763 34.489 21.1608 31.8223C21.6471 31.0397 22.2117 30.2576 22.6985 29.5107C23.0231 29.0133 23.643 28.5159 23.9262 28.0532C26.8069 23.4312 31.4435 18.7736 31.4435 14.1867V12.3023C31.4436 11.8051 30.7403 10.0628 30.7007 9.95562ZM15.6357 18.5247C13.608 18.5247 11.3886 17.6362 10.2932 15.1824C10.13 14.7918 10.1431 14.0091 10.1431 13.9374V12.8351C10.1431 9.70703 13.1739 8.28452 15.8105 8.28452C19.0565 8.28452 21.567 10.5604 21.567 13.405C21.567 16.2496 18.8816 18.5247 15.6357 18.5247Z",
                            fillColor: marker.color,
                            fillOpacity: 1,
                            anchor: new google.maps.Point(0, 0),
                            strokeWeight: 0,
                            scale: 1
                          } 
                          : this.markerIcon
                      });

                  if (marker.infowindow) {
                      const infowindow = new google.maps.InfoWindow({
                          content: marker.infowindow
                          });

                      google.maps.event.addListener(
                          markerPoint,
                          'click',
                          (
                              () => infowindow.open(this.map, markerPoint)
                          )
                      );
                  }
                  });
              }

              this.style.display = 'block';
              this.dispatchEvent(new CustomEvent('google-map-ready', {detail: this.map}));
          });
      }

      /**
       * Black and white style for the map
       *
       * @returns {({stylers: [{color: string}], elementType: string}|{stylers: [{visibility: string}], elementType: string}|{stylers: [{color: string}],
       *     elementType: string}|{stylers: [{color: string}], elementType: string}|{featureType: string, stylers: [{color: string}], elementType:
       *     string})[]}
       * @private
       */
      _blackAndWhiteStyle()
      {
          return [
              {
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#f5f5f5'
                  }
                  ]
          },
              {
                  'elementType': 'labels.icon',
                  'stylers': [
                      {
                          'visibility': 'off'
                  }
                  ]
          },
              {
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#616161'
                  }
                  ]
          },
              {
                  'elementType': 'labels.text.stroke',
                  'stylers': [
                      {
                          'color': '#f5f5f5'
                  }
                  ]
          },
              {
                  'featureType': 'administrative.land_parcel',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#bdbdbd'
                  }
                  ]
          },
              {
                  'featureType': 'poi',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#eeeeee'
                  }
                  ]
          },
              {
                  'featureType': 'poi',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#757575'
                  }
                  ]
          },
              {
                  'featureType': 'poi.park',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#e5e5e5'
                  }
                  ]
          },
              {
                  'featureType': 'poi.park',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#9e9e9e'
                  }
                  ]
          },
              {
                  'featureType': 'road',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#ffffff'
                  }
                  ]
          },
              {
                  'featureType': 'road.arterial',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#757575'
                  }
                  ]
          },
              {
                  'featureType': 'road.highway',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#dadada'
                  }
                  ]
          },
              {
                  'featureType': 'road.highway',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#616161'
                  }
                  ]
          },
              {
                  'featureType': 'road.local',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#9e9e9e'
                  }
                  ]
          },
              {
                  'featureType': 'transit.line',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#e5e5e5'
                  }
                  ]
          },
              {
                  'featureType': 'transit.station',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#eeeeee'
                  }
                  ]
          },
              {
                  'featureType': 'water',
                  'elementType': 'geometry',
                  'stylers': [
                      {
                          'color': '#c9c9c9'
                  }
                  ]
          },
              {
                  'featureType': 'water',
                  'elementType': 'labels.text.fill',
                  'stylers': [
                      {
                          'color': '#9e9e9e'
                  }
                  ]
          }
          ];
      }
  });
}
