import { useState, useEffect, useMemo } from 'react';
import { uploadImage } from 'actions/imageupload';
import './FileLoader.scss';

function FileLoader() {
  const [base64Image, setBase64image] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const fileReader = useMemo(() => {
    return new FileReader();
  }, []);

  function handleFileLoad(event) {
    setBase64image(event.target.result);
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
    uploadImage(selectedImage)
      .then(() => {
        alert('Image Uploaded!');
      })
      .catch(() => {
        alert('Image Upload Failed!');
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
          </div>
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
    </div>
  );
}

export default FileLoader;
