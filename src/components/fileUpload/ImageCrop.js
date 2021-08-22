import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const initialCropState = {
  unit: '%',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  aspect: 3 / 2,
};

function ImageCrop({ src, handleImageLoaded, handleCropComplete }) {
  const [crop, setCrop] = useState(initialCropState);

  function handleChange(crop) {
    setCrop(crop);
  }

  return (
    <ReactCrop
      src={src}
      crop={crop}
      onChange={handleChange}
      onImageLoaded={handleImageLoaded}
      onComplete={handleCropComplete}
    />
  );
}

export default ImageCrop;
