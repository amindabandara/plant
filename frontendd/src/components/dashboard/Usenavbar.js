import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Usernavbar.css';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Planting Guides</h3>
      </div>
      <ul className="list-unstyled components">
        <li className="active">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/discussion">Discussion</Link>
        </li>
        <li>
          <Link to="/success-stories">Success Stories</Link>
        </li>
        <li>
          <Link to="/guide">Guide</Link>
        </li>
        <li>
          <Link to="/video">Video</Link>
        </li>
        <li>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserNavbar;

