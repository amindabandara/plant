import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin</h3>
      </div>
      <ul className="list-unstyled components">
        <li className="active">
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/adminplant">plant</a>
        </li>
        <li>
          <a href="/adminvideo">Video</a>
        </li>
        <li>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;

