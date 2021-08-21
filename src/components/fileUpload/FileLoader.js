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
    // TODO: FIX
    uploadImage(selectedImage)
      .then((uploadedImage) => {
        onFileUpload(uploadedImage._id);
        setImageStatus('UPLOADED');
      })
      .catch(() => {
        setImageStatus('ERROR');
      });
  }

  function cancelImageUpload() {
    imageInputRef.current.value = null;
    setSelectedImage(null);
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
      {selectedImage && <ImageCrop src={selectedImage.src} />}
      {selectedImage && (
        <>
          <div className="img-preview-container mb-2">
            <div className="img-preview">
              <img src={selectedImage.src} alt="Upload" />
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
