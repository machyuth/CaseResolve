import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from './AccordionAdmin';
import AgentInfo from './AgentInfo';

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand className="fw-bold fs-4 text-white">Welcome, Admin {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="ms-auto">
              <Nav.Link
                as="div"
                className={`text-light mx-2 ${activeComponent === 'dashboard' ? 'fw-bold text-primary' : ''}`}
                onClick={() => handleNavLinkClick('dashboard')}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as="div"
                className={`text-light mx-2 ${activeComponent === 'UserInfo' ? 'fw-bold text-primary' : ''}`}
                onClick={() => handleNavLinkClick('UserInfo')}
              >
                User Info
              </Nav.Link>
              <Nav.Link
                as="div"
                className={`text-light mx-2 ${activeComponent === 'Agent' ? 'fw-bold text-primary' : ''}`}
                onClick={() => handleNavLinkClick('Agent')}
              >
                Agent Info
              </Nav.Link>
            </Nav>
            <Button onClick={handleLogout} variant="outline-danger" className="ms-3">
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="container py-4">
        {activeComponent === 'dashboard' && <AccordionAdmin />}
        {activeComponent === 'UserInfo' && <UserInfo />}
        {activeComponent === 'Agent' && <AgentInfo />}
      </main>
    </>
  );
};

export default AdminHome;
