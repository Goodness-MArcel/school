
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import Placeholder from "react-bootstrap/Placeholder";
import { Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCamera } from "@fortawesome/free-solid-svg-icons";
import AlertModal from "../component/AlertModal";
import { getAdminProfile, editAdmin } from "../../api/userService";
import "./admin.css";

function Admin() {
  const { user } = useAuth();
  const [profileLoadError, setProfileLoadError] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/100");
  const originalDataRef = useRef(null);

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

  // ✅ Fetch admin data (runs only when user.id changes)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getAdminProfile();
        const profile = res.admin;

        setProfileLoadError(null);
        setAdminData({
          fullName: profile.fullname || "",
          role: profile.role || "administrator",
          password: "",
          email: profile.email || "",
          contact: profile.contact || "",
          image: profile.image || "",
        });
        setPreviewImage(profile.image || "https://via.placeholder.com/100");
      } catch (err) {
        console.error("Error loading profile:", err);
        setProfileLoadError(
          err?.response?.data?.message || err.message || "Failed to load profile"
        );
      }
    };

    if (user?.id) {
      loadProfile();
    } else {
      setProfileLoadError("Not signed in");
    }
  }, [user?.id]); // 👈 only when user ID changes

  // ✅ Handle field change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ Handle image change + preview
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  // ✅ Edit mode
  const handleEditClick = useCallback(() => {
    originalDataRef.current = adminData;
    setIsEditing(true);
  }, [adminData]);

  // ✅ Cancel edit
  const handleCancelClick = useCallback(() => {
    const prev = originalDataRef.current;
    if (prev) setAdminData(prev);
    setSelectedFile(null);
    setPreviewImage(prev?.image || "https://via.placeholder.com/100");
    setIsEditing(false);
    setShowPassword(false);
  }, []);

  // ✅ Toggle password visibility
  const togglePassword = useCallback(() => setShowPassword((prev) => !prev), []);

  // ✅ Save updates
  const handleSaveClick = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const formData = new FormData();
        Object.entries(adminData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (selectedFile) formData.append("profileImage", selectedFile);

        const res = await editAdmin(formData);

        if (res.status === 200) {
          const updated = res.data.profile;
          showModal("Success", "Profile updated successfully!", "success");

          setAdminData({
            fullName: updated.fullname,
            role: updated.role,
            password: "",
            email: updated.email,
            contact: updated.contact,
            image: updated.image,
          });

          setPreviewImage(updated.image || previewImage);
          setIsEditing(false);
          setSelectedFile(null);
        } else {
          showModal("Failed", "Failed to update profile. Try again.", "danger");
        }
      } catch (err) {
        console.error("Error updating profile:", err);
        showModal("Error", "Error updating profile.", "danger");
      } finally {
        setLoading(false);
      }
    },
    [adminData, selectedFile, previewImage]
  );

  if (profileLoadError) {
    return (
      <div className="text-center mt-4">
        <p className="text-danger">{profileLoadError}</p>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => window.open("/", "_self")}
          >
            Go to Home / Sign in
          </button>
        </div>
      </div>
    );
  }
  if (!adminData) {
    return (
      <Fade in={true} appear={true} timeout={300}>
        <div className="container mt-5">
          <div className="border rounded p-4 " >
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>

            <div className="d-flex align-items-center gap-3 mt-3">
              <Placeholder
                as="div"
                animation="wave"
                className="rounded-circle bg-secondary"
                style={{ width: "100px", height: "100px" }}
              />
              <div className="flex-grow-1">
                <Placeholder as="p" animation="glow">
                  <Placeholder xs={8} /> <Placeholder xs={5} /> <Placeholder xs={6} />
                </Placeholder>
              </div>
            </div>

            <div className="mt-4">
              <Placeholder as="div" animation="wave">
                <Placeholder xs={12} /> <Placeholder xs={10} /> <Placeholder xs={9} />
              </Placeholder>
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  return (
    <>
      <Fade in={!!adminData} appear={true} timeout={400}>
        <div className="placeholder-box border rounded p-4">
          <h3 className="text-black">Admin Profile</h3>

          <div className="main-body">
            <div className="header-admin d-flex align-items-center gap-3">
              <div className="position-relative" style={{ width: "100px" }}>
                <img
                  src={previewImage}
                  alt="Profile"
                  className="rounded-circle border"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                {isEditing && (
                  <>
                    <label
                      htmlFor="profileUpload"
                      className="position-absolute top-50 start-50 translate-middle bg-dark text-white rounded-circle p-2"
                      style={{ cursor: "pointer", opacity: "0.8" }}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </label>
                    <input
                      type="file"
                      id="profileUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>

              {!isEditing && (
                <button className="btn btn-primary edit-profilebtn" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>

            <div className="body-admin p-4 mt-4">
              <form onSubmit={handleSaveClick}>
                <div className="row">
                  {/* LEFT SIDE */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-black">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={adminData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label text-black">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={adminData.role}
                        onChange={handleChange}
                        disabled={!isEditing}
                      >
                        <option value="administrator">Administrator</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>

                    <div className="mb-3 position-relative">
                      <label className="form-label text-black">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          value={adminData.password}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        {isEditing && (
                          <span
                            className="input-group-text"
                            onClick={togglePassword}
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label text-black">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={adminData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-black">Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={adminData.contact}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="text-end mt-3">
                    <button type="submit" className="btn text-light me-2" disabled={loading} style={{backgroundColor: '#8855ff'}}>
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

      </Fade>
      <AlertModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalInfo.title}
        message={modalInfo.message}
        variant={modalInfo.variant}
      />
    </>
  );
}

export default React.memo(Admin);
