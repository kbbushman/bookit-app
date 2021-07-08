import { createContext, useContext } from 'react';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';

const MapContext = createContext(null);

export function MapProvider({ children, apiKey }) {
  function initMap() {
    const map = tt.map({
      key: apiKey,
      container: 'bi-map',
      styel: 'tomtom://vector/1/basic-main',
      zoom: 14,
      scrollZoom: false,
    });
    map.addControl(new tt.NavigationControl());
    return map;
  }

  async function requestGeoLocation(location) {
    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
      );

      if (response.data.results.length > 0) {
        const { position } = response.data.results[0];
        return position;
      }
      return Promise.reject('Location not found');
    } catch (err) {
      return Promise.reject('Location not found');
    }
  }

  function setCenter(map, position) {
    map.setCenter(new tt.LngLat(position.lon, position.lat));
  }

  function addMarker(map, position) {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'bi-marker';

    new tt.Marker({
      element: markerDiv,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  }

  function addPopupMessage(map, message) {
    new tt.Popup({
      className: 'bi-popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  }

  const mapApi = {
    initMap,
    requestGeoLocation,
    setCenter,
    addMarker,
    addPopupMessage,
  };

  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
}

export function useMap() {
  return useContext(MapContext);
}
