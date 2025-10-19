import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmLogoutModal({ show, onConfirm, onCancel }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ color: "#8855ff", fontSize: "3rem", marginBottom: "1rem" }}
        />
        <p className="mb-0">Are you sure you want to log out?</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button
          style={{
            backgroundColor: "#fb3748", // red
            borderColor: "#fb3748",
            color: "#fff",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#d00416")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#fb3748")}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          style={{
            backgroundColor: "#8855ff", // purple
            borderColor: "#8855ff",
            color: "#fff",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4d00ff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#8855ff")}
          onClick={onConfirm}
        >
          Yes, Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
