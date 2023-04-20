import Button from "components/layout/Button";
import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = ({
  handleLeftClick,
  handleRightClick,
  leftText,
  rightText,
  handleClose,
  title,
  modalBody,
  rightButtonProperties,
  show,
}) => {
  return (
    <>
      <BootstrapModal show={show} onHide={handleClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{modalBody()}</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button
            variant="secondary"
            onClick={handleLeftClick}
            title={leftText}
          ></Button>
          <Button
            variant="primary"
            onClick={handleRightClick}
            title={rightText}
            {...rightButtonProperties}
          />
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export default Modal;
