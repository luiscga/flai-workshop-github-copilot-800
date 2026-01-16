import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Card } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users - Fetching from API endpoint:', apiUrl);
    
    try {
      const response = await fetch(apiUrl);
      console.log('Users - Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users - Raw fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersData = data.results || data;
      console.log('Users - Processed data:', usersData);
      
      setUsers(Array.isArray(usersData) ? usersData : []);
      setLoading(false);
    } catch (err) {
      console.error('Users - Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getFitnessLevelColor = (level) => {
    const levels = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'danger',
      'Expert': 'dark'
    };
    return levels[level] || 'secondary';
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
          <Alert.Heading>Error Loading Users</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">👤 Users</h2>
      {users.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Users Found</Alert.Heading>
          <p>No registered users yet.</p>
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Fitness Level</th>
                  <th>Height (cm)</th>
                  <th>Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.email}</td>
                    <td>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</td>
                    <td>
                      <Badge bg={getFitnessLevelColor(user.fitness_level)}>
                        {user.fitness_level || 'N/A'}
                      </Badge>
                    </td>
                    <td>{user.height || 'N/A'}</td>
                    <td>{user.weight || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Users;
