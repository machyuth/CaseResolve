import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Footer from '../common/FooterC';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, agentsRes] = await Promise.all([
          axios.get('http://localhost:8000/status'),
          axios.get('http://localhost:8000/AgentUsers')
        ]);
        setComplaintList(complaintsRes.data);
        setAgentList(agentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      await axios.post('http://localhost:8000/assignedComplaints', {
        agentId,
        complaintId,
        status,
        agentName
      });

      setComplaintList(prev =>
        prev.filter(complaint => complaint._id !== complaintId)
      );
      alert(`Complaint assigned to ${agentName}`);
    } catch (error) {
      console.error(error);
      alert("Failed to assign complaint.");
    }
  };

  return (
    <>
      <Accordion alwaysOpen className="my-4">
        {/* Complaints Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Users Complaints</Accordion.Header>
          <Accordion.Body style={{ background: '#f0f8ff' }}>
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {complaintList.length > 0 ? (
                complaintList.map((complaint, idx) => (
                  <Card key={idx} style={{ width: '18rem' }} className="shadow-sm">
                    <Card.Body className="text-center">
                      <Card.Title>{complaint.name}</Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: '14px' }}>
                        <div>📍 {complaint.address}, {complaint.city}, {complaint.state} - {complaint.pincode}</div>
                        <div className="mt-2">📝 {complaint.comment}</div>
                        <div>Status: <strong>{complaint.status}</strong></div>
                      </Card.Text>
                      {complaint.status !== 'completed' && (
                        <Dropdown>
                          <Dropdown.Toggle variant="warning">Assign</Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agentList.map((agent, i) => (
                              <Dropdown.Item
                                key={i}
                                onClick={() =>
                                  handleAssign(agent._id, complaint._id, complaint.status, agent.name)
                                }
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">No complaints to show</Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Agents Accordion */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Agents</Accordion.Header>
          <Accordion.Body style={{ background: '#f0f8ff' }}>
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {agentList.length > 0 ? (
                agentList.map((agent, idx) => (
                  <Card key={idx} style={{ width: '18rem' }} className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{agent.name}</Card.Title>
                      <Card.Text className="text-muted">Email: {agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">No agents to show</Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Footer />
    </>
  );
};

export default AccordionAdmin;
