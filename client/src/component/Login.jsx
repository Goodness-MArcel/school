import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './login.css';
function Login() {
    const [showPassword , setShowPassword] = useState(false);
    const [user , setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) =>{
        const {name ,value} = e.target ;
        setUser(userInfo =>({...userInfo, [name]: value}));
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(user)
    }
    return (
        <>
            <div className="container-fluid main-container">

                <div className="container">
                    <div className="row ">
                        <div className="col-md-6">
                            <h1>welcome back.</h1>
                            <p style={{fontWeight: 500}}>login to access your school dashboard.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="" className="form-label" style={{fontWeight: 500}}>Email Address</label>
                                    <input type="email" className="form-control" placeholder="Your Email" onChange={handleChange} name="email" value={user.email} id="" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="" className="form-label" style={{fontWeight: 500}}>Password</label>
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'} onChange={handleChange} name="password" value={user.password} className=" form-control"
                                         placeholder="Your Password" required />
                                        <span className="input-group-text" onClick={()=>setShowPassword(!showPassword)}>
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}></FontAwesomeIcon>
                                        </span>

                                    </div>

                                </div>
                                <button className="w-100 btn text-capitalize ">login</button>
                                <a href="" className="text-decoration-none d-block mt-3 text-dark text-capitalize">forgotten password ?</a>
                            </form>
                        </div>
                        <div className="col-md-6 d-none d-md-block">
                            <img src="image1.svg" alt="" width={400} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;