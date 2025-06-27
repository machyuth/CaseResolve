import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">Welcome, {userName}</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${activeComponent === 'Complaint' ? 'active fw-semibold' : ''}`}
                  onClick={() => handleNavLinkClick('Complaint')}
                >
                  Complaint Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${activeComponent === 'Status' ? 'active fw-semibold' : ''}`}
                  onClick={() => handleNavLinkClick('Status')}
                >
                  Status
                </NavLink>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="py-4 bg-light min-vh-100">
        <div className="container">
          {activeComponent === 'Complaint' && <Complaint />}
          {activeComponent === 'Status' && <Status />}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
