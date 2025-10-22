
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faCirclePlus, faArrowLeft ,faFileExport} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getSessionData } from "../../api/userService";
import LoadingSpinner from "../component/Spinner";
import "./schoolsession.css";

function SchoolSessions() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const schoolSession = async () => {
      try {
        setLoading(true);
        const res = await getSessionData();
        console.log("Fetched data:", res);
        setSessionData(res);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false); // Ensure loading state is reset
      }
    };
    schoolSession();
  }, []);

  // Handle create new button click
  const handleCreateNew = () => {
    setShowCreateForm(true);
  };

  // Handle back button click
  const handleBack = () => {
    setShowCreateForm(false);
  };

  // Handle filter form submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Filtering..."); // Replace with actual filter logic
  };

  // Handle create form submission
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("Creating session..."); // Replace with API call to create session
    setShowCreateForm(false);
  };

  return (
    <div className="container py-3">

      {/* Header Section */}
      <div className="header-part-session mb-3 p-3 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">
          {showCreateForm ? "Add New School Session" : "School Sessions"}
        </h3>
        {showCreateForm ? (
          <button
            className="btn btn-outline-danger d-flex align-items-center"
            onClick={handleBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back
          </button>
        ) : (
          <button
            style={{ backgroundColor: "#3c00c6" }}
            className="btn d-flex align-items-center text-white create-new"
            onClick={handleCreateNew}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
            Create New
          </button>
        )}
      </div>

      {/* Main Section */}
      <div className="main-schoolSession p-3 rounded">
        {/* Conditional Rendering */}
        {!showCreateForm ? (
          <>
            <div className="container search_school_part p-4 rounded bg-light">
              <form onSubmit={handleFilterSubmit}>
                <div className="row g-3">
                  {/* Term Dropdown */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="term" className="form-label fw-semibold">
                        Term
                      </label>
                      <select id="term" className="form-select">
                        <option value="">Select term</option>
                        <option value="first">First Term</option>
                        <option value="second">Second Term</option>
                        <option value="third">Third Term</option>
                      </select>
                    </div>
                  </div>

                  {/* Session Dropdown */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="session" className="form-label fw-semibold">
                        Session
                      </label>
                      <select id="session" className="form-select">
                        <option value="">Select session</option>
                        <option value="2024/2025">2024 / 2025</option>
                        <option value="2023/2024">2023 / 2024</option>
                        <option value="2022/2023">2022 / 2023</option>
                      </select>
                    </div>
                  </div>

                  {/* Year Dropdown */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="year" className="form-label fw-semibold">
                        Year
                      </label>
                      <select id="year" className="form-select">
                        <option value="">Select year</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filter Button */}
                <div className="text-end mt-2">
                  <button type="submit" className="btn filter-btn px-4">
                    <FontAwesomeIcon icon={faFilter} className="me-2" />
                    Filter
                  </button>
                </div>
              </form>
            </div>
            <div className="container rounded p-3 mt-3 allsection">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <div className="school_sessionHeader d-flex justify-content-between mb-2">
                    <h5 className="text-capitalize">Session table</h5>
                    <button className="btn btn-outline-primary text-dark">
                      <FontAwesomeIcon icon={faFileExport} className="me-2"/>
                      export
                    </button>
                  </div>

                  <table className="table table-bordered table-responsive">
                    <thead className="">
                      <tr>
                        {/* <th>Session ID</th> */}
                        <th>Session Name</th>
                        <th>Term</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionData.map((session, index) => (
                        <tr key={session.session_id}>
                          {/* <td>{session.session_id}</td> */}
                          <td>{session.session_name}</td>
                          <td>{session.term.charAt(0).toUpperCase() + session.term.slice(1)} Term</td>
                          <td>{new Date(session.start_date).toISOString().split('T')[0]}</td>
                          <td>{new Date(session.end_date).toISOString().split('T')[0]}</td>
                          <td
                            className={`status-badge ${session.
                              status === "active"
                              ? "status-active"
                              : session.status === "pending"
                                ? "status-pending"
                                : session.status === "completed"
                                  ? "status-completed"
                                  : session.status === "upcoming"
                                    ? "status-upcoming"
                                    : "status-default"
                              }`}
                          >
                            <span>{session.status.charAt(0).toUpperCase() + session.status.slice(1)}</span>
                          </td>
                          <td><a href="#" className="text-decoration-none">view details</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </>
        ) : (
          // Create School Session Section
          <div className="container p-4 rounded" style={{ backgroundColor: "white" }}>
            <form onSubmit={handleCreateSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="sessionName" className="form-label fw-semibold">
                      Session Name
                    </label>
                    <input
                      type="text"
                      id="sessionName"
                      className="form-control"
                      placeholder="e.g., 2024 / 2025 Academic Year"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="termSelect" className="form-label fw-semibold">
                      Term
                    </label>
                    <select id="termSelect" className="form-select">
                      <option value="">Select term</option>
                      <option value="first">First Term</option>
                      <option value="second">Second Term</option>
                      <option value="third">Third Term</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label fw-semibold">
                      Start Date
                    </label>
                    <input type="date" id="startDate" className="form-control" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label fw-semibold">
                      End Date
                    </label>
                    <input type="date" id="endDate" className="form-control" />
                  </div>
                </div>
              </div>

              <div className="text-end mt-3">
                <button
                  type="submit"
                  style={{ backgroundColor: "#3c00c6" }}
                  className="btn px-4 text-light save-session"
                >
                  Save Session
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchoolSessions;
