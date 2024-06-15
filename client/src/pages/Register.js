import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();
    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
        console.log(values);
        
        try {
            const response = await axios.post('/api/users/register', values);
            console.log('Response:', response.data);
            navigate('/login'); // Log the response data
            // Additional handling if needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
        // Log the form data
        // You can add further validation or submission logic here
    }
    useEffect(()=>{
        if(localStorage.getItem('user'))
            navigate('/');
    },[navigate]);

    return (
        <>
            <form onSubmit={handleSubmit}>
            <Link to='/login'><p style={{ textAlign: 'right', marginRight: '37pc' }}>Already registered? click to login</p></Link>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        autoComplete="name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Register;
