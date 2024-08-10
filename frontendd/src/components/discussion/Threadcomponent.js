import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../dashboard/Usenavbar';
import { useParams } from 'react-router-dom'; // Import useParams

const ThreadComponent = () => {
  const { id } = useParams(); // Use useParams to get the route parameter
  const [thread, setThread] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/threadmanager/${id}`); // Use id from useParams
        setThread(response.data);
      } catch (error) {
        console.error('Error fetching discussion thread:', error);
      }
    };

    fetchThread();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5003/threadmanager/${id}/messages`, { content: newMessage, user });
      setNewMessage('');
      // Optionally, refresh the thread or messages here
    } catch (error) {
      console.error('Error posting new message:', error);
    }
  };

  if (!thread) return <p>Loading...</p>;

  return (
    <div>
        <UserNavbar/>
      <h2>{thread.title}</h2>
      <p>{thread.description}</p>
      <div>
        <h3>Messages</h3>
        {thread.messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul>
            {thread.messages.map((message, index) => (
              <li key={index}>
                <p>{message.content}</p>
                <small>{message.user || 'Anonymous'} - {new Date(message.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Your name (optional)"
          />
          <button type="submit">Reply</button>
        </form>
      </div>
    </div>
  );
};

export default ThreadComponent;

