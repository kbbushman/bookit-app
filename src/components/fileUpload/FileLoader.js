import { useState, useEffect, useMemo } from 'react';
import { uploadImage } from 'actions/imageupload';
import './FileLoader.scss';

function FileLoader() {
  const [base64Image, setBase64image] = useState('');
  const [imageStatus, setImageStatus] = useState('INIT');
  const [selectedImage, setSelectedImage] = useState(null);

  const fileReader = useMemo(() => {
    return new FileReader();
  }, []);

  function handleFileLoad(event) {
    setBase64image(event.target.result);
    setImageStatus('LOADED');
  }

  useEffect(() => {
    fileReader.addEventListener('load', handleFileLoad);

    return () => {
      fileReader.removeEventListener('load', handleFileLoad);
    };
  }, [fileReader]);

  function handleChange(event) {
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);
    setSelectedImage(file);
  }

  function handleImageUpload() {
    setImageStatus('PENDING');
    uploadImage(selectedImage)
      .then(() => {
        setImageStatus('UPLOADED');
      })
      .catch(() => {
        setImageStatus('ERROR');
      });
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
        />
      </label>
      {base64Image && (
        <>
          <div className="img-preview-container mb-2">
            <div className="img-preview">
              <img src={base64Image} alt="Upload" />
            </div>
            {imageStatus === 'PENDING' && (
              <div className="spinner-container upload-status">Loading...</div>
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
            <>
              <button
                className="btn btn-success me-2"
                type="button"
                onClick={handleImageUpload}
              >
                Upload
              </button>
              <button className="btn btn-danger" type="button">
                Cancel
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default FileLoader;
