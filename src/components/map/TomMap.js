import { useEffect, useCallback, useRef } from 'react';
import { useMap } from 'providers/MapProvider';
import './TomMap.scss';

function TomMap({ location }) {
  let map = useRef(null);
  const { initMap, requestGeoLocation, setCenter } = useMap();

  const getGeoLocation = useCallback(
    async (location) => {
      if (location) {
        const position = await requestGeoLocation(location);
        console.log(position);
        setCenter(map.current, position);
      }
    },
    [requestGeoLocation, map, setCenter]
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
