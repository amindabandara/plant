import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import UserNavbar from './Usenavbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    axios.post('http://localhost:5003/logout')
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('There was an error logging out!', error);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <UserNavbar />
      <div className="dashboard-container">
        <h2>User Dashboard</h2>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        <p>Hi user welcome to our system</p>
        {/* Your existing code for displaying employees */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
