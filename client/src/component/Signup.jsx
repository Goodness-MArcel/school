import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faChalkboardUser, faUserShield, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './signup.css';
function Signup() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showcomfirmPassword, setShowComfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        fullname: '',
        email: '',
        password: '',
        cpassword: '',
    });
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'radio' ? target.value : target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const nextStep = () => {
        setStep(step + 1);
    }
    const prevStep = () => {
        setStep(step - 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log(formData);


        // alert('Form submitted! Check console for details.');

        try {
            setLoading(true);
            if (formData.password !== formData.cpassword) {
                setError('Passwords do not match');
                return;
            }
            if (!formData.role) {
                setError('Please select a role');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
            console.log(formData);

        } catch (error) {
            setLoading(false);
            setError('An error occurred during signup. Please try again.');
        }
    }
    //     if(error) return <div className="alert alert-danger" role="alert">
    //     {error}
    //   </div>

    return (
        <>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="container-fluid main-con">

                        <div className="container-fluid signup_container">
                            <div className="row justify-content-center">
                                <div className="col-md-5 right_side text-center ">
                                    <h1 className="text-capitalize" style={{ fontSize: '30px' }}>who are you signing up as ?</h1>
                                    <p>
                                        To help us personalize your experience , please choose your role .
                                        Dont worry , you can change your role later in settings.
                                    </p>
                                    <div className="role-container d-flex justify-content-center align-items-center  flex-wrap gap-4">
                                        <label>
                                            <input type="radio" name="role" value="admin" checked={formData.role === 'admin'} onChange={handleChange} className="d-none" />
                                            <span className="custom-radio">
                                                <FontAwesomeIcon icon={faUserShield} fontSize={16} />
                                                <p>admistrator</p>
                                            </span>
                                        </label>
                                        <label>
                                            <input type="radio" name="role" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} className="d-none" />
                                            <span className="custom-radio">
                                                <FontAwesomeIcon icon={faChalkboardUser} fontSize={16} />
                                                <p>teacher</p>
                                            </span>
                                        </label>
                                        <label>
                                            <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} className="d-none" />
                                            <span className="custom-radio">
                                                <FontAwesomeIcon icon={faUserGraduate} fontSize={16} />
                                                <p>student</p>
                                            </span>
                                        </label>
                                    </div>
                                    <button className="btn btn-primary mt-4 w-100  text-capitalize createAccBtn" onClick={nextStep}>Create account</button>
                                </div>
                                <div className="col-md-5 left_side d-none d-md-flex justify-content-center align-items-center">
                                    <img src="../image3.svg" alt="" className="img-fluid" width={500} />
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="container-fluid main-con ">
                        <div className="container-fluid signup_container">
                            {error && <div className="alert alert-danger error" role="alert">
                                {error}
                            </div>}
                            <div className="row justify-content-center">
                                <div className="col-md-5 text-capitalize ">
                                    <h1 className=" text-sm-center ">create your account</h1>
                                    <p className=" text-sm-center " style={{ fontWeight: 500 }}>create your account to start managing your school account with ease.</p>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label  text-capitalize fw-900" style={{ fontWeight: 500 }}>full name</label>
                                        <input type="text" className="form-control" name="fullname" placeholder="Your Name" value={formData.fullname} required onChange={handleChange} aria-describedby="emailHelp" />
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label text-capitalize" style={{ fontWeight: 500 }}>email address</label>
                                        <input type="email" className="form-control" placeholder="your Email" name="email" value={formData.email} required onChange={handleChange} aria-describedby="emailHelp" />
                                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label text-capitalize" style={{ fontWeight: 500 }}>
                                            password
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                // id="exampleInputPassword1"
                                                required
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange} // keep input controlled
                                                placeholder="your password"
                                            />
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label text-capitalize" style={{ fontWeight: 500 }}>confirm password</label>
                                        <div className="input-group">

                                            <input type={showcomfirmPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" required placeholder="comfirm password" name="cpassword" value={formData.cpassword} onChange={handleChange} />
                                            <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => setShowComfirmPassword(!showcomfirmPassword)}
                                            >
                                                <FontAwesomeIcon icon={showcomfirmPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                    </div>
                                    <button className="btn btn-warning" onClick={prevStep}>back</button>
                                    <button className="btn btn-primary mt-4 w-100  text-capitalize createAccBtn">
                                        {loading ? (
                                            <div class="spinner-border spinner-border-sm" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        ) : 'Sign Up'}
                                    </button>


                                </div>
                                <div className="col-md-5 left_side d-none d-md-flex justify-content-center align-items-center">
                                    <img src="../image2.svg" alt="" className="img-fluid" width={500} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </form>
        </>
    )
}

export default Signup;

