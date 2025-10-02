import "./registerschool.css";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function RegisterSchool() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const schoolLogo = useRef();
  const [message , setMessage] =useState('')
  const [error, setError] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [schoolData, setSchoolData] = useState({
    name: "",
    logo: "",
    email: "",
    address: "",
    website: "",
  });

  useEffect(() => {
    if (error && error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  useEffect(()=>{
    if(message){
        const timer = setTimeout(()=>{
            setMessage('')
        },3000)
        return ()=>clearTimeout(timer)
    }
  },[message])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSchoolData((prev) => ({ ...prev, logo: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to register a school");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/registerSchool",
        {
          id: user.id,
          ...schoolData,
        }
      );
      console.log("school registered successfully", response.data);
      setMessage(response.data.message)
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
        setMessage(err.response.data.message)
      }
      setLoading(false);
        setMessage(err.response.data.message)

      console.log("unable to submit form data", err.response.data.message);
    }
  };

  const getLogo = () => {
    schoolLogo.current.click();
  };

  const getFieldError = (field) => {
    const errObj = error.find((err) => err.path === field);
    return errObj ? <small className="text-danger">{errObj.msg}</small> : null;
  };

  return (
    <div className="container-fluid main-container p-2">
        {message && <div className="alert alert-success">{message}</div>}
        {/* {error && <div className="alert alert-success">{error[0].msg}</div>} */}
      <div className="container p-2 second-main text-center mt-5">
        <h1 className="text-capitalize">Register Your School</h1>
        <p style={{ fontWeight: 500 }}>
          This will give you access to your dashboard, where you can manage <br />
          teachers, students, classes, and more.
        </p>

        {/* global error messages */}
        
        <form className="third-main mt-5 p-2" onSubmit={handleSubmit}>
          <div className="row">
            {/* Left column */}
            <div className="col-md-6">
              <input
                type="file"
                hidden
                name="logo"
                ref={schoolLogo}
                onChange={handleFileChange}
              />
              <div className="image mb-3" onClick={getLogo}>
                {preview ? (
                  <img src={preview} alt="Preview" className="img-school" />
                ) : (
                  <div className="overlay-text">
                    <p>Upload School Logo</p>
                    <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon" />
                  </div>
                )}
              </div>
              {getFieldError("logo")}

              <div className="mb-3 text-start">
                <label className="form-label fw-bold">School Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={schoolData.address}
                  placeholder="School Address"
                  required
                  onChange={handleChange}
                />
                {getFieldError("address")}
              </div>
            </div>

            {/* Right column */}
            <div className="col-md-6 text-start">
              <div className="mb-3">
                <label className="form-label fw-bold">School Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  value={schoolData.name}
                  onChange={handleChange}
                  placeholder="School Name"
                />
                {getFieldError("name")}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">School Website</label>
                <input
                  type="text"
                  className="form-control"
                  value={schoolData.website}
                  name="website"
                  placeholder="schoolwebsite.com"
                  required
                  onChange={handleChange}
                />
                {getFieldError("website")}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">School Email</label>
                <input
                  type="email"
                  value={schoolData.email}
                  className="form-control"
                  name="email"
                  placeholder="school Email"
                  required
                  onChange={handleChange}
                />
                {getFieldError("email")}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mb-3 text-center">
            <button className="btn btn-primary text-capitalize w-50" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ms-2">Registering...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterSchool;
