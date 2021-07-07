import { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import './TomMap.scss';

function TomMap() {
  useEffect(() => {
    const map = tt.map({
      key: 'N6OcrIpWfFwnTLIPEksAN31KNeoQ3pda',
      container: 'bi-map',
    });
    map.addControl(new tt.NavigationControl());
  }, []);

  return <div id="bi-map"></div>;
}

export default TomMap;
