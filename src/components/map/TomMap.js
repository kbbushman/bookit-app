import { useEffect } from 'react';
import { useMap } from 'providers/MapProvider';
import './TomMap.scss';

function TomMap() {
  const { initMap } = useMap();

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <div id="bi-map"></div>;
}

export default TomMap;
