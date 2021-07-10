import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

function BiModal({ open, onCloseModal, onSubmit, title, subtitle, children }) {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{ modal: 'bi-modal' }}
      center
    >
      <div className="modal-container">
        <h4 className="modal-title title">{title}</h4>
        <p className="modal-subtitle">{subtitle}</p>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-success" onClick={onSubmit}>
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default BiModal;
