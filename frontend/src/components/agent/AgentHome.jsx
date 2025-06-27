import React, { useState, useEffect } from 'react';
import {
  Button, Container, Nav, Navbar, Card, Alert, Collapse
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';

const AgentHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [toggle, setToggle] = useState({});
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return navigate('/');
        setUserName(user.name);

        const res = await axios.get(`http://localhost:8000/allcomplaints/${user._id}`);
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [navigate]);

  const handleToggle = (id) => {
    setToggle((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusChange = async (complaintId) => {
    try {
      await axios.put(`https://caseresolve.onrender.com/complaint/${complaintId}`, { status: 'completed' });
      setComplaints((prev) =>
        prev.map((c) =>
          c._doc.complaintId === complaintId
            ? { ...c, _doc: { ...c._doc, status: 'completed' } }
            : c
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="white" variant="white" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-blue">Hi Agent {userName}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink className="nav-link text-bluet">View Complaints</NavLink>
            </Nav>
            <Button onClick={LogOut} variant="outline-danger">Log out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', paddingTop: '30px' }}>
        <Container className="d-flex flex-wrap justify-content-center">
          {complaints.length > 0 ? (
            complaints.map((item, i) => {
              const c = item._doc;
              const isOpen = toggle[c.complaintId] || false;
              return (
                <Card
                  key={i}
                  className="m-3 shadow-sm"
                  style={{
                    width: '20rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #d1dbe3'
                  }}
                >
                  <Card.Body>
                    <Card.Title className="text-primary">{item.name}</Card.Title>
                    <Card.Text><strong>Address:</strong> {item.address}</Card.Text>
                    <Card.Text><strong>City:</strong> {item.city}</Card.Text>
                    <Card.Text><strong>State:</strong> {item.state}</Card.Text>
                    <Card.Text><strong>Pincode:</strong> {item.pincode}</Card.Text>
                    <Card.Text><strong>Comment:</strong> {item.comment}</Card.Text>
                    <Card.Text>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`badge ${
                          c.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'
                        }`}
                      >
                        {c.status}
                      </span>
                    </Card.Text>

                    {c.status !== 'completed' && (
                      <Button
                        onClick={() => handleStatusChange(c.complaintId)}
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                      >
                        Mark as Completed
                      </Button>
                    )}

                    <Button
                      onClick={() => handleToggle(c.complaintId)}
                      variant="outline-primary"
                      size="sm"
                    >
                      {isOpen ? 'Hide' : 'Message'}
                    </Button>

                    <Collapse in={isOpen}>
                      <div className="mt-3">
                        <Card className="border-light shadow-sm">
                          <Card.Body>
                            <ChatWindow complaintId={c.complaintId} name={userName} />
                          </Card.Body>
                        </Card>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <Alert className="w-100 text-center mt-4" variant="info">
              <Alert.Heading>No complaints to show</Alert.Heading>
            </Alert>
          )}
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default AgentHome;
