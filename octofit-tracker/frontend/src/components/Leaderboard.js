import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Card } from 'react-bootstrap';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard - Fetching from API endpoint:', apiUrl);
    
    try {
      const response = await fetch(apiUrl);
      console.log('Leaderboard - Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Leaderboard - Raw fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const leaderboardData = data.results || data;
      console.log('Leaderboard - Processed data:', leaderboardData);
      
      setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      setLoading(false);
    } catch (err) {
      console.error('Leaderboard - Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
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
          <Alert.Heading>Error Loading Leaderboard</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Leaderboard Entries</Alert.Heading>
          <p>Complete activities to appear on the leaderboard!</p>
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Total Calories</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry._id || entry.id || index}>
                    <td>
                      {index === 0 && <Badge bg="warning" className="me-2">🥇</Badge>}
                      {index === 1 && <Badge bg="secondary" className="me-2">🥈</Badge>}
                      {index === 2 && <Badge bg="danger" className="me-2">🥉</Badge>}
                      {entry.rank || index + 1}
                    </td>
                    <td><strong>{entry.user?.username || entry.user || 'Unknown'}</strong></td>
                    <td>{entry.team?.name || entry.team || 'N/A'}</td>
                    <td>
                      <Badge bg="danger">{entry.total_calories} cal</Badge>
                    </td>
                    <td>
                      <Badge bg="info">{entry.period}</Badge>
                    </td>
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

export default Leaderboard;
