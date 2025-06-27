import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC';
import axios from 'axios';

const AgentInfo = () => {
  const navigate = useNavigate();
  const [agentList, setAgentList] = useState([]);
  const [toggle, setToggle] = useState({});
  const [updateFields, setUpdateFields] = useState({});

  const handleToggle = (id) => {
    setToggle(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setUpdateFields(prev => ({
      ...prev,
      [id]: { name: '', email: '', phone: '' }
    }));
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setUpdateFields(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value
      }
    }));
  };

  const handleSubmit = async (id) => {
    const data = updateFields[id];
    if (!data.name && !data.email && !data.phone) {
      alert('Please fill at least one field');
      return;
    }
    const confirm = window.confirm('Are you sure you want to update the agent?');
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:8000/user/${id}`, data);
      alert('Agent updated successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete the agent?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/OrdinaryUsers/${id}`);
      setAgentList(agentList.filter(agent => agent._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAgents = async () => {
      try {
        const res = await axios.get('http://localhost:8000/agentUsers');
        setAgentList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAgents();
  }, [navigate]);

  return (
    <>
      <Container className="my-5">
        <h3 className="text-center mb-4">Agent Management</h3>
        {agentList.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No Agents to show</Alert.Heading>
          </Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agentList.map(agent => (
                <React.Fragment key={agent._id}>
                  <tr>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleToggle(agent._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteUser(agent._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="p-0">
                      <Collapse in={toggle[agent._id]}>
                        <div className="p-3 bg-light">
                          <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(agent._id); }}>
                            <Form.Group className="mb-2">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                value={updateFields[agent._id]?.name || ''}
                                onChange={(e) => handleChange(agent._id, e)}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={updateFields[agent._id]?.email || ''}
                                onChange={(e) => handleChange(agent._id, e)}
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Label>Phone</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={updateFields[agent._id]?.phone || ''}
                                onChange={(e) => handleChange(agent._id, e)}
                              />
                            </Form.Group>
                            <Button type="submit" variant="success" size="sm">
                              Save Changes
                            </Button>
                          </Form>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AgentInfo;
