import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1>Welcome to OctoFit Tracker</h1>
        <p className="lead mt-4">
          Track your fitness activities, compete with teams, and achieve your fitness goals!
        </p>
        <div className="mt-5">
          <h3>Getting Started</h3>
          <p>Use the navigation menu above to explore:</p>
          <ul className="list-unstyled">
            <li>📊 <strong>Activities</strong> - View all logged fitness activities</li>
            <li>🏆 <strong>Leaderboard</strong> - See who's leading in calories burned</li>
            <li>👥 <strong>Teams</strong> - Browse and manage fitness teams</li>
            <li>👤 <strong>Users</strong> - View user profiles</li>
            <li>💪 <strong>Workouts</strong> - Explore personalized workout plans</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="App-logo"
              />
              OctoFit Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
