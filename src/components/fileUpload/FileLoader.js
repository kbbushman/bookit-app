import './FileLoader.scss';

function FileLoader() {
  function handleChange(event) {
    const file = event.target.files[0];
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
    </div>
  );
}

export default FileLoader;
