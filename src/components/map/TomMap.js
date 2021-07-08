import { useEffect, useCallback, useRef } from 'react';
import { useMap } from 'providers/MapProvider';
import './TomMap.scss';

function TomMap({ location }) {
  let map = useRef(null);
  const { initMap, requestGeoLocation, setCenter, addMarker } = useMap();

  const getGeoLocation = useCallback(
    async (location) => {
      if (location) {
        const position = await requestGeoLocation(location);
        setCenter(map.current, position);
        addMarker(map.current, position);
      }
    },
    [requestGeoLocation, map, setCenter, addMarker]
  );

  useEffect(() => {
    getGeoLocation(location, map);
  }, [location, getGeoLocation]);

  useEffect(() => {
    map.current = initMap();
  }, [initMap]);

  return <div id="bi-map"></div>;
}

export default TomMap;
