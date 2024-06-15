import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate=useNavigate();
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        const {data} = await axios.post('/api/users/login', values);
        // console.log('Response:', response.data);
         console.log('success');
         localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
        navigate('/'); // Log the response data
        // Additional handling if needed
    } catch (error) {
        console.error('Error:', error);
        console.log('something wrong');
        // Handle error, show error message, etc.
    }
    // Log the form data
    // You can add further validation or submission logic here
}
useEffect(()=>{
  if(localStorage.getItem('user'))
      navigate('/');
},[navigate])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 style={{ margin: '5pc' }}>Login</h3>
        <Link to='/register'><p style={{ textAlign: 'right', marginRight: '37pc' }}>Don't have an account?</p></Link>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
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
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default Login;
