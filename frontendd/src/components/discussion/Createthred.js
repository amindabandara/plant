import React, { useState } from 'react';
import axios from 'axios';
import UserNavbar from '../dashboard/Usenavbar';

const CreateThreadComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5003/threadmanager/adddiscussions', { title, description });
      setTitle('');
      setDescription('');
      // Optionally, redirect or refresh the page
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <div>
        <UserNavbar/>
      <h2>Create a New Thread</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Thread</button>
      </form>
    </div>
  );
};

export default CreateThreadComponent;
