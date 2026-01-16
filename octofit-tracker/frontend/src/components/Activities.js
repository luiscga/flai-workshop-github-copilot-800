import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Card } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities - Fetching from API endpoint:', apiUrl);
    
    try {
      const response = await fetch(apiUrl);
      console.log('Activities - Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Activities - Raw fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const activitiesData = data.results || data;
      console.log('Activities - Processed data:', activitiesData);
      
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setLoading(false);
    } catch (err) {
      console.error('Activities - Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getActivityTypeBadge = (type) => {
    const types = {
      'Running': 'primary',
      'Cycling': 'success',
      'Swimming': 'info',
      'Weightlifting': 'warning',
      'Yoga': 'secondary'
    };
    return types[type] || 'dark';
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
          <Alert.Heading>Error Loading Activities</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">📊 Activities</h2>
      {activities.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Activities Found</Alert.Heading>
          <p>Start logging your fitness activities to see them here!</p>
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Activity Type</th>
                  <th>User</th>
                  <th>Duration (min)</th>
                  <th>Distance (km)</th>
                  <th>Calories Burned</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id}>
                    <td>
                      <Badge bg={getActivityTypeBadge(activity.activity_type)}>
                        {activity.activity_type}
                      </Badge>
                    </td>
                    <td>{activity.user?.username || activity.user || 'Unknown'}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.distance}</td>
                    <td>
                      <Badge bg="danger">{activity.calories_burned} cal</Badge>
                    </td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
