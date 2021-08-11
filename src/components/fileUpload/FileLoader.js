function FileLoader() {
  function handleChange(event) {
    const file = event.target.files[0];
  }

  return (
    <>
      <label className="upload-text">Select an image</label>
      <input
        className="form-control"
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={handleChange}
      />
    </>
  );
}

export default FileLoader;
