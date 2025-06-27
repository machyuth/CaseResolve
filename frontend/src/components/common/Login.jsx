import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';
import './Login.css';

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: '',
      password: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post('https://caseresolve.onrender.com/Login', user);
         alert('Successfully logged in');
         localStorage.setItem('user', JSON.stringify(res.data));
         const { userType } = res.data;

         switch (userType) {
            case 'Admin':
               navigate('/AdminHome');
               break;
            case 'Ordinary':
               navigate('/HomePage');
               break;
            case 'Agent':
               navigate('/AgentHome');
               break;
            default:
               navigate('/Login');
         }
      } catch (err) {
         if (err.response?.status === 401) {
            alert("User doesn’t exist");
         }
         navigate('/Login');
      }
   };

   return (
      <>
         <Navbar bg="light" className="shadow-sm">
            <Container>
               <Navbar.Brand className="fw-bold fs-3 text-primary">CaseResolve</Navbar.Brand>
               <ul className="navbar-nav flex-row gap-3">
                  <li className="nav-item">
                     <Link to="/" className="nav-link text-dark">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/signup" className="nav-link text-dark">SignUp</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/login" className="nav-link text-dark">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <section className="login-section py-5">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-6">
                     <div className="card shadow-lg border-0 rounded-4 p-4">
                        <div className="text-center mb-4">
                           <h2 className="fw-bold text-primary">Login to Register Complaints</h2>
                           <p className="text-muted">Enter your credentials below</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                           </div>
                           <div className="mb-4">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" required />
                           </div>
                           <div className="d-grid">
                              <button type="submit" className="btn btn-primary btn-lg">Login</button>
                           </div>
                        </form>
                        <p className="mt-3 text-center text-muted">
                           Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <Footer />
      </>
   );
};

export default Login;
