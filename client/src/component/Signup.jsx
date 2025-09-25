import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faChalkboardUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import './signup.css';
function Signup() {
    return (
        <div className="container-fluid main-con">
            <div className="container-fluid signup_container">
                <div className="row justify-content-center">
                    <div className=" col-md-5 right_side text-center ">
                        <h1 className="text-capitalize" style={{ fontSize: '30px' }}>who are you signing up as ?</h1>
                        <p>
                            To help us personalize your experience , please choose your role .
                            Dont worry , you can change your role later in settings.
                        </p>
                        <div className="role-container d-flex justify-content-center align-items-center  flex-wrap gap-4">
                            <label>
                                <input type="radio" name="role" value="teacher" className="d-none" />
                                <span className="custom-radio">
                                    <FontAwesomeIcon icon={faUserShield} fontSize={16} />
                                    <p>admistrator</p>
                                </span>
                            </label>
                            <label>
                                <input type="radio" name="role" value="teacher" className="d-none" />
                                <span className="custom-radio">
                                    <FontAwesomeIcon icon={faChalkboardUser} fontSize={16} />
                                    <p>teacher</p>
                                </span>
                            </label>
                            <label>
                                <input type="radio" name="role" value="teacher" className="d-none" />
                                <span className="custom-radio">
                                    <FontAwesomeIcon icon={faUserGraduate} fontSize={16} />
                                    <p>student</p>
                                </span>
                            </label>
                        </div>
                        <button className="btn btn-primary mt-4 w-50  text-capitalize createAccBtn">Create account</button>
                    </div>
                    <div className="col-md-5 left_side d-none d-md-flex justify-content-center align-items-center">
                        <img src="../image3.svg" alt="" className="img-fluid" width={500} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup;