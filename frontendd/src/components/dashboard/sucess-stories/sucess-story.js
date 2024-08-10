import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessStoriesActions.css';
import UserNavbar from '../Usenavbar';

const SuccessStoriesActions = () => {
  return (
    <div className="success-stories-actions">
        <UserNavbar/>
      <h2>Success Stories</h2>
      <div className="buttons-container">
        <Link to="/success-stories/add">
          <button className="btn btn-primary">Add Success Story</button>
        </Link>
        <Link to="/success-stories/view">
          <button className="btn btn-secondary">View Success Stories</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessStoriesActions;
