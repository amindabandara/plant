import React from 'react';
import { Link } from 'react-router-dom';
import './DiscussionActions.css';
import AdminNavbar from '../dashboard/Admin/Adminnavbar';
import UserNavbar from '../dashboard/Usenavbar';

const DiscussionActions = () => {
  return (
    
    <div className="discussion-actions">
        <UserNavbar/>
      <h2>Discussion</h2>
      <div className="buttons-container">
        <Link to="/discussion/add">
          <button className="btn btn-primary">Add Discussion</button>
        </Link>
        <Link to="/discussion/view">
          <button className="btn btn-secondary">View Discussion</button>
        </Link>
        <Link to="/discussion/th">
          <button className="btn btn-secondary">View thread</button>
        </Link>
      </div>
    </div>
  );
};

export default DiscussionActions;
