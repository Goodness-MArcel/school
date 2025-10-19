// src/components/AlertModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ show, onHide, title, message, variant }) => {
  // ✅ Custom styles for header background
  const getHeaderStyle = () => {
    switch (variant) {
      case "success":
        return { backgroundColor: "#1fc16b", color: "white" }; // custom dark green
      case "danger":
        return { backgroundColor: "#d00416", color: "white" }; // Bootstrap red
      case "warning":
        return { backgroundColor: "#ffc107", color: "black" }; // Bootstrap yellow
      default:
        return { backgroundColor: "#0d6efd", color: "white" }; // Bootstrap primary
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={getHeaderStyle()}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;

