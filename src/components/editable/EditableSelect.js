import { useState } from 'react';

function EditableSelect({
  entity,
  field,
  className,
  handleUpdateRental,
  options,
  inline,
}) {
  const [value, setValue] = useState(entity[field]);
  const [originalValue, setOriginalValue] = useState(entity[field]);
  const [isActiveInput, setIsActiveInput] = useState(false);

  function handleCancel() {
    setIsActiveInput(false);
    setValue(originalValue);
  }

  function onSuccess() {
    setOriginalValue(value);
    setIsActiveInput(false);
  }

  function onError() {
    setValue(originalValue);
    setIsActiveInput(false);
  }

  async function update() {
    if (value !== originalValue) {
      const rentalData = { [field]: value };
      handleUpdateRental(rentalData, onSuccess, onError);
    }
  }

  function renderOptions(options) {
    return options.map((option) => (
      <option key={option} value={option}>{`${option}`}</option>
    ));
  }

  function renderView() {
    if (isActiveInput) {
      return (
        <>
          <select
            className={`editable-item ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {renderOptions(options)}
          </select>
          <div className="button-container">
            <button
              onClick={handleCancel}
              className="btn btn-sm btn-danger ms-3 btn-editable"
              autoFocus={false}
            >
              Cancel
            </button>
            <button
              onClick={update}
              className="btn btn-sm btn-success ms-3 btn-editable"
              autoFocus
            >
              Save
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <span className={`editable-item ${className}`}>{`${value}`}</span>
        <div className="button-container">
          <button
            onClick={() => setIsActiveInput(true)}
            className="btn btn-sm btn-warning btn-editable"
            autoFocus={false}
          >
            Edit
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      className={`editable-component ${inline && 'editable-component-inline'}`}
    >
      {renderView()}
    </div>
  );
}

export default EditableSelect;
