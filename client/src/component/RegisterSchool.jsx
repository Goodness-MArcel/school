import './registerschool.css'
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function RegisterSchool() {
    const schoolLogo = useRef();
    const [isloading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [schoolData, setSchoolData] = useState({
        name: '',
        logo: '',
        email: '',
        address: '',
        website: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolData(prev => ({ ...prev, [name]: value }));
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSchoolData((prev) => ({ ...prev, logo: file.name }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log(schoolData);
            alert('form submitted')
        } catch (error) {
            console.log('unable to submit form data', error)
        }
    }
    const getLogo = () => {
        schoolLogo.current.click();
    }
    return (
        <>
            <div className="container-fluid main-container p-2">
                <div className="nav  container">
                    {preview && (
                        <img src={preview} alt="" />
                    )}</div>
                <div className="container p-2 second-main text-center mt-5">
                    <h1 className='text-capitalize'>register your school</h1>
                    <p style={{ fontWeight: 500 }}>
                        This will give you access to your dashboard, where you can manage <br /> teachers, students, classes and more.
                    </p>
                    <form className="third-main mt-5 p-2" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 ">
                                <input type="file" hidden name="logo" ref={schoolLogo} onChange={handleFileChange} id="" />
                                <div className="image mb-3" onClick={getLogo}>
                                    {preview && (
                                        <img src={preview} alt="" className="img-school" />
                                    )}
                                    <img src="" className="img-school" />
                                    <div className="overlay-text">
                                        <p>Upload School Logo</p>
                                        <FontAwesomeIcon icon={faCloudArrowUp} className="upload-icon" />
                                    </div>
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="exampleInputEmail1" className="form-label  text-capitalize fw-900" style={{ fontWeight: 500 }}>school Address</label>
                                    <input type="text" className="form-control" name="address" value={schoolData.address} placeholder="school Address" required onChange={handleChange} />

                                </div>

                            </div>
                            <div className="col-md-6 text-start">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label  text-capitalize fw-900" style={{ fontWeight: 500 }}>school name</label>
                                    <input type="text" className="form-control" required name="name" value={schoolData.name} onChange={handleChange} placeholder="school Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label  text-capitalize fw-900" style={{ fontWeight: 500 }}>School website</label>
                                    <input type="text" className="form-control" value={schoolData.website} name="website" placeholder="schoolwebsite.com" required onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label  text-capitalize fw-900" style={{ fontWeight: 500 }}>school email Address</label>
                                    <input type="email" value={schoolData.email} className="form-control" name="email" placeholder="school Email" required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className='btn  text-capitalize w-50'>
                                {
                                    isloading ? (
                                        <>
                                            <div class="spinner-border spinner-border-sm" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <span className='ms-2'>registering ...</span>
                                        </>
                                    ) :
                                    'register'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterSchool;