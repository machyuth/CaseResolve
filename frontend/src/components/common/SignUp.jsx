import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';
import './SignUp.css';

const SignUp = () => {
  const [title, setTitle] = useState('Select User');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (select) => {
    setTitle(select);
    setUser({ ...user, userType: select });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { ...user, userType: title };
    try {
      await axios.post('http://localhost:8000/SignUp', updatedUser);
      alert('Record submitted');
    } catch (err) {
      console.log(err);
    }

    setUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      userType: '',
    });
    setTitle('Select User');
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

      <section className="signup-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div className="card shadow-lg border-0 rounded-4 p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Register for CaseResolve</h2>
                  <p className="text-muted">Create your account to file complaints</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" name="phone" value={user.phone} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label d-block">User Type</label>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" className="w-100">
                        {title}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleTitle('Ordinary')}>Ordinary</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTitle('Admin')}>Admin</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTitle('Agent')}>Agent</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>
                </form>
                <p className="mt-3 text-center text-muted">
                  Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
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

export default SignUp;
