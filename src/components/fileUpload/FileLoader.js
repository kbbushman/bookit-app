import { useState, useMemo, useRef } from 'react';
import { uploadImage } from 'actions/imageupload';
import Spinner from 'components/shared/Spinner';
import ImageCrop from './ImageCrop';
import './FileLoader.scss';

class ImageSnippet {
  constructor(src, name, type) {
    this.src = src;
    this.name = name;
    this.type = type;
  }
}

function FileLoader({ onFileUpload }) {
  const imageInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageStatus, setImageStatus] = useState('INIT');

  const fileReader = useMemo(() => {
    return new FileReader();
  }, []);

  function handleChange(event) {
    const file = event.target.files[0];

    fileReader.onloadend = function (event) {
      const selectedImage = new ImageSnippet(
        event.target.result,
        file.name,
        file.type
      );
      setSelectedImage(selectedImage);
      setImageStatus('LOADED');
    };

    fileReader.readAsDataURL(file);
  }

  function handleImageUpload() {
    setImageStatus('PENDING');

    const imageToUpload = new File([croppedImage], croppedImage.name, {
      type: croppedImage.type,
    });

    uploadImage(imageToUpload)
      .then((uploadedImage) => {
        onFileUpload(uploadedImage._id);
        setImageStatus('UPLOADED');
      })
      .catch(() => {
        setImageStatus('ERROR');
      });
  }
  function handleImageLoaded(image) {
    setOriginalImage(image);
  }

  async function handleCropComplete(crop) {
    if (!originalImage) return;

    setCroppedImage(
      await getCroppedImg(originalImage, crop, selectedImage.name)
    );
  }

  function cancelImageUpload() {
    imageInputRef.current.value = null;
    setSelectedImage(null);
    setCroppedImage(null);
    setImageStatus('INIT');
  }

  return (
    <div className="img-upload-container">
      <label className="img-upload btn btn-bi-form">
        <span className="upload-text">Select an image</span>
        <input
          className="file-input"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
          ref={imageInputRef}
        />
      </label>
      {selectedImage && (
        <ImageCrop
          src={selectedImage.src}
          handleImageLoaded={handleImageLoaded}
          handleCropComplete={handleCropComplete}
        />
      )}
      {selectedImage && (
        <>
          <div className="img-preview-container mb-2">
            <div className="img-preview">
              <img
                src={(croppedImage && croppedImage.url) || selectedImage.src}
                alt="Upload"
              />
            </div>
            {imageStatus === 'PENDING' && (
              <div className="spinner-container upload-status">
                <Spinner />
              </div>
            )}

            {imageStatus === 'UPLOADED' && (
              <div className="alert alert-success upload-status">
                Image successfully uploaded
              </div>
            )}

            {imageStatus === 'ERROR' && (
              <div className="alert alert-danger upload-status">
                Image upload failed
              </div>
            )}
          </div>
          {imageStatus === 'LOADED' && (
            <button
              className="btn btn-success me-2"
              type="button"
              onClick={handleImageUpload}
            >
              Upload
            </button>
          )}
          <button
            className="btn btn-danger"
            type="button"
            onClick={cancelImageUpload}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default FileLoader;

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');
  // return base64Image;

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          reject('Canvas is empty');
          return;
        }
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        blob.url = fileUrl;
        resolve(blob);
      },
      'image/jpeg',
      1
    );
  });
}
