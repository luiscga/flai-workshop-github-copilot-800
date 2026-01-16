import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Card, Button, Modal } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts - Fetching from API endpoint:', apiUrl);
    
    try {
      const response = await fetch(apiUrl);
      console.log('Workouts - Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Workouts - Raw fetched data:', data);
      
      // Handle both paginated (.results) and plain array responses
      const workoutsData = data.results || data;
      console.log('Workouts - Processed data:', workoutsData);
      
      setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      setLoading(false);
    } catch (err) {
      console.error('Workouts - Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const handleShowDetails = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
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
          <Alert.Heading>Error Loading Workouts</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">💪 Workouts</h2>
      {workouts.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Workouts Found</Alert.Heading>
          <p>Check back later for personalized workout suggestions!</p>
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Workout Name</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>Duration (min)</th>
                  <th>Est. Calories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout._id || workout.id}>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.workout_type}</td>
                    <td>
                      <Badge bg={getDifficultyColor(workout.difficulty_level)}>
                        {workout.difficulty_level}
                      </Badge>
                    </td>
                    <td>{workout.duration}</td>
                    <td>
                      <Badge bg="danger">{workout.estimated_calories} cal</Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowDetails(workout)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Modal for displaying workout details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedWorkout?.name}
            <Badge bg={getDifficultyColor(selectedWorkout?.difficulty_level)} className="ms-2">
              {selectedWorkout?.difficulty_level}
            </Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description</h5>
          <p>{selectedWorkout?.description || 'No description available.'}</p>
          
          <h5>Details</h5>
          <ul>
            <li><strong>Type:</strong> {selectedWorkout?.workout_type}</li>
            <li><strong>Duration:</strong> {selectedWorkout?.duration} minutes</li>
            <li><strong>Estimated Calories:</strong> {selectedWorkout?.estimated_calories}</li>
          </ul>

          {selectedWorkout?.exercises && selectedWorkout.exercises.length > 0 && (
            <>
              <h5>Exercises</h5>
              <ul className="list-group">
                {selectedWorkout.exercises.map((exercise, idx) => (
                  <li key={idx} className="list-group-item">{exercise}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            Start Workout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Workouts;
