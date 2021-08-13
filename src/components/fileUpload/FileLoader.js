import { useState, useEffect, useMemo } from 'react';
import './FileLoader.scss';

function FileLoader() {
  const [base64Image, setBase64image] = useState('');

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
      {base64Image && <img src={base64Image} alt="Upload" />}
    </div>
  );
}

export default FileLoader;
