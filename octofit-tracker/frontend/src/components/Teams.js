import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Card, Button, Modal } from 'react-bootstrap';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams - Fetching from API endpoint:', apiUrl);
    
    try {
      const response = await fetch(apiUrl);
      console.log('Teams - Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams - Raw fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const teamsData = data.results || data;
      console.log('Teams - Processed data:', teamsData);
      
      setTeams(Array.isArray(teamsData) ? teamsData : []);
      setLoading(false);
    } catch (err) {
      console.error('Teams - Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleShowMembers = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Teams</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">👥 Teams</h2>
      {teams.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Teams Found</Alert.Heading>
          <p>Create a team to start competing with others!</p>
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Description</th>
                  <th>Members</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.id}>
                    <td><strong>{team.name}</strong></td>
                    <td>{team.description || 'No description'}</td>
                    <td>
                      <Badge bg="primary">
                        {team.members?.length || 0} members
                      </Badge>
                    </td>
                    <td>{new Date(team.created_at).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowMembers(team)}
                        disabled={!team.members || team.members.length === 0}
                      >
                        View Members
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Modal for displaying team members */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTeam?.name} - Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam?.members && selectedTeam.members.length > 0 ? (
            <ul className="list-group">
              {selectedTeam.members.map((member, idx) => (
                <li key={idx} className="list-group-item">
                  {typeof member === 'string' ? member : member.username || member}
                </li>
              ))}
            </ul>
          ) : (
            <p>No members in this team.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Teams;
