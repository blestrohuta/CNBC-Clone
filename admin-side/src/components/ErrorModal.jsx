import Modal from "react-bootstrap/Modal";

export default function ErrorModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1 className="text-danger">{props.title || "Title"}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.content || "Content"}</h4>
      </Modal.Body>
    </Modal>
  );
}
