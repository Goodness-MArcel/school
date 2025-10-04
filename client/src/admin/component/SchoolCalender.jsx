import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SchoolCalender() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
    setShowModal(true); // open modal instead of prompt
  };

  // Save event
  const handleSaveEvent = () => {
    if (eventTitle.trim() !== "") {
      setEvents([...events, { date: selectedDate, title: eventTitle }]);
      setEventTitle(""); // clear input
      setShowModal(false); // close modal
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar"
        tileContent={({ date, view }) => {
          if (view === "month") {
            const event = events.find(
              (e) => e.date.toDateString() === date.toDateString()
            );
            return event ? (
              <div className="event-dot" title={event.title}></div>
            ) : null;
          }
        }}
      />

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </Form.Group>
            <p className="mt-2">
              📅 Selected Date: <strong>{selectedDate?.toDateString()}</strong>
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SchoolCalender;
