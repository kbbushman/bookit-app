import { createContext, useContext } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

const MapContext = createContext(null);

export function MapProvider({ children, apiKey }) {
  function initMap() {
    const map = tt.map({
      key: apiKey,
      container: 'bi-map',
    });
    map.addControl(new tt.NavigationControl());
  }

  const mapApi = { initMap };

  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
}

export function useMap() {
  return useContext(MapContext);
}
