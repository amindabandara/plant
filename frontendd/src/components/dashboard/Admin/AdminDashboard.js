import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import AdminNavbar from './Adminnavbar';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <div className="video-section">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Watch this overview video to get started:</p>
          <video controls width="100%" className="admin-video">
            <source src="path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="plant-guide-section">
          <h2>Planting Guides</h2>
          <p>Explore our comprehensive planting guides to enhance your knowledge:</p>
          <ul className="plant-guide-list">
            <li><a href="path/to/guide1.pdf" target="_blank" rel="noopener noreferrer">Guide 1</a></li>
            <li><a href="path/to/guide2.pdf" target="_blank" rel="noopener noreferrer">Guide 2</a></li>
            <li><a href="path/to/guide3.pdf" target="_blank" rel="noopener noreferrer">Guide 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

