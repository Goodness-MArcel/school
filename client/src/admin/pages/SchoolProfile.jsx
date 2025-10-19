import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./admin.css";
import AlertModal from "../component/AlertModal";
// import { AuthProvider } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import { editSchool, getSchoolProfile } from "../../api/userService";

function School() {
  const { user } = useAuth();
  console.log(user.id);

  const [editMode, setEditMode] = useState(false);
  const [schoolProfile, setSchoolProfile] = useState(null); // single object, not array
  const [showAccreditation, setShowAccreditation] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ Modal states
  const [modalShow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    message: "",
    variant: "",
  });

  // ✅ Helper function to open modal
  const showModal = (title, message, variant = "primary") => {
    setModalInfo({ title, message, variant });
    setModalShow(true);
  };

  const [school, setSchool] = useState({
    userId: user.id,
    logo: "https://via.placeholder.com/100x100?text=Logo",
    name: "",
    website: "",
    contact: "",
    address: "",
    classes: "",
    accreditation: "",
  });

  useEffect(() => {
    async function getSchoolInfo() {
      try {
        const res = await getSchoolProfile();
        // If backend returns an array of schools, take the first one
        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        if (data) {
          setSchoolProfile(data); // keep original for resetting later
          setSchool({
            userId: user.id,
            logo: data.logo || "https://via.placeholder.com/100x100?text=Logo",
            name: data.name || "",
            website: data.website || "",
            contact: data.contact || "",
            address: data.address || "",
            classes: data.classes || "",
            accreditation: data.accreditation || "",
          });
        }

        console.log("Fetched school data:", data);
      } catch (error) {
        console.error("Error fetching school info:", error);
      }
    }

    getSchoolInfo();
  }, [user.id]);

  // Handle text inputs
  const handleChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  // Toggle accreditation visibility
  const toggleAccreditationVisibility = () => {
    setShowAccreditation(!showAccreditation);
  };

  // Handle school logo upload and preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setSchool({ ...school, logo: previewURL });
    setSelectedFile(file);
  };

  // Edit, Cancel, Save
  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setSelectedFile(null);

    // Reset all fields back to original fetched data
    if (schoolProfile) {
      setSchool({
        userId: user.id,
        logo: schoolProfile.logo || "https://via.placeholder.com/100x100?text=Logo",
        name: schoolProfile.name || "",
        website: schoolProfile.website || "",
        contact: schoolProfile.contact || "",
        address: schoolProfile.address || "",
        classes: schoolProfile.classes || "",
        accreditation: schoolProfile.accreditation || "",
      });
    }
  };

  const handleSave = async () => {
    setUploading(true);
    const formData = new FormData();

    // Append school data
    Object.keys(school).forEach((key) => {
      if (key !== "logo") {
        formData.append(key, school[key]);
      }
    });

    // Append logo file if selected
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    try {
      const response = await editSchool(formData);
      const data = response.data;

      if (response.status === 200) {
        setSchool((prev) => ({
          ...prev,
          ...data.schoolData,
          logo: data.imageUrl || prev.logo,
        }));

        // Update both states with new info
        setSchoolProfile(data.schoolData);
        setSelectedFile(null);
        setEditMode(false);
        showModal("Success", "School profile updated successfully!", "success");
        // alert("School profile updated successfully!");
      } else {
        alert(data.message || "Failed to update school profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      showModal("Failed", "Something went wrong while updating the profile", "danger");

      // alert("Something went wrong while updating the profile.");
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="placeholder-box border p-4">
      <h3 className="text-dark">School Profile</h3>

      <div className="main-body">
        {/* Header */}
        <div className="header-admin d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 position-relative">
            <img
              src={school.logo}
              alt="School Logo"
              className="rounded-circle border"
              width="100"
              height="100"
            // crossOrigin="true"
            />

            {/* Camera icon visible only in edit mode */}
            {editMode && (
              <>
                <label
                  htmlFor="logoUpload"
                  className="position-absolute"
                  style={{
                    bottom: "0",
                    left: "70px",
                    backgroundColor: "#c4aaff",
                    color: "black",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                />
              </>
            )}

            <div className="d-none d-md-block">
              <h5 className="mb-0">{school.name}</h5>
              <small className="text-muted">{school.website}</small>
            </div>
          </div>

          {!editMode && (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Form */}
        <div className="body-admin p-1 mt-5">
          <form>
            <div className="row">
              <div className="col-md-6">
                {/* School Name */}
                <div className="mb-3">
                  <label className="form-label text-dark">School Name</label>
                  <input
                    type="text"
                    name="name"
                    value={school.name}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!editMode}
                  />
                </div>

                {/* Website */}
                <div className="mb-3">
                  <label className="form-label text-dark">School Website</label>
                  <input
                    type="text"
                    name="website"
                    value={school.website}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!editMode}
                  />
                </div>

                {/* Contact */}
                <div className="mb-3">
                  <label className="form-label text-dark">School Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={school.contact}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="col-md-6">
                {/* Address */}
                <div className="mb-3">
                  <label className="form-label text-dark">School Address</label>
                  <input
                    type="text"
                    name="address"
                    value={school.address}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!editMode}
                  />
                </div>

                {/* Number of Classes */}
                <div className="mb-3">
                  <label className="form-label text-dark">Number of Classes</label>
                  <input
                    type="number"
                    name="classes"
                    value={school.classes}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!editMode}
                  />
                </div>

                {/* Accreditation Number with toggle */}
                <div className="mb-3 position-relative">
                  <label className="form-label text-dark">Accreditation Number</label>
                  <input
                    type={showAccreditation ? "text" : "password"}
                    name="accreditation"
                    value={school.accreditation}
                    onChange={handleChange}
                    className="form-control pe-5"
                    disabled={!editMode}
                  />
                  {editMode && (
                    <FontAwesomeIcon
                      icon={showAccreditation ? faEyeSlash : faEye}
                      onClick={toggleAccreditationVisibility}
                      className="position-absolute"
                      style={{
                        right: "15px",
                        top: "45px",
                        cursor: "pointer",
                        color: "#555",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            {editMode && (
              <div className="mt-3 d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSave}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <AlertModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalInfo.title}
        message={modalInfo.message}
        variant={modalInfo.variant}
      />
    </div>
  );
}

export default School;