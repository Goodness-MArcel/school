import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './login.css';
import axios from "axios";
function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [ success, setSuccess ] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    useEffect(()=>{
        if(error) {
            const timer = setTimeout(()=>{
                setError('')
        },3000)
        return ()=> clearTimeout(timer)
        }
        
    },[error]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(userInfo => ({ ...userInfo, [name]: value }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(credentials)
        try {
            setLoading(true);
            setError('')
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            });
            if (authError) {
                setError(authError.message);
                console.log(authError.message)
                setLoading(false);
                return;
            }
            console.log(data.user)
            if (data.user) {
                const res = await axios.post('http://localhost:3000/api/login', {
                    id: data.user.id
                });
                const successs = res.data.message;
                setSuccess(successs);
                const profile = res.data;
                setUser(profile.user);
                console.log(profile.user)
                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000)
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setError('An error occurred. Please try again.')
            setLoading(false);
            return;
        }
    }
    return (
        <>
            <div className="container-fluid main-container">
                <div className="container">
                    {error && <div className="alert alert-danger message-alert">{error}</div>}
                    {success && <div className="alert alert-success message-alert">{success}</div>}
                    <div className="row ">
                        <div className="col-md-6">
                            <h1>welcome back.</h1>
                            <p style={{ fontWeight: 500 }}>login to access your school dashboard.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="" className="form-label" style={{ fontWeight: 500 }}>Email Address</label>
                                    <input type="email" className="form-control" placeholder="Your Email" onChange={handleChange} name="email" value={credentials.email} id="" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="" className="form-label" style={{ fontWeight: 500 }}>Password</label>
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'} onChange={handleChange} name="password" value={credentials.password} className=" form-control"
                                            placeholder="Your Password" required />
                                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash}></FontAwesomeIcon>
                                        </span>

                                    </div>

                                </div>
                                <button className="w-100 btn text-capitalize ">{
                                    loading ? (
                                       <>
                                             <div
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                       </>
                                    ): 'login'
                                    }</button>
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