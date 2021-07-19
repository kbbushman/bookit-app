import { useState } from 'react';

function EditableInput({ entity, field, className, handleUpdateRental }) {
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

  function renderView() {
    if (isActiveInput) {
      return (
        <>
          <input
            className={className}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
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
        <span className={className}>{value}</span>
        <div className="button-container">
          <button
            onClick={() => setIsActiveInput(true)}
            className="btn btn-sm btn-warning ms-3 btn-editable"
            autoFocus={false}
          >
            Edit
          </button>
        </div>
      </>
    );
  }

  return <div className="editable-component">{renderView()}</div>;
}

export default EditableInput;
