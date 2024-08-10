import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../dashboard/Admin/Adminnavbar';

const AdminVideoTutorial = () => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoUrl: '',
    tags: [''],
  });

  const handleAddVideo = () => {
    axios.post('http://localhost:5003/videomanager/', newVideo)
      .then(response => {
        // Optionally clear form or handle success
        setNewVideo({
          title: '',
          description: '',
          videoUrl: '',
          tags: [''],
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <AdminNavbar />
      <h1>Admin - Manage Video Tutorials</h1>
      <div>
        <h2>Add New Video Tutorial</h2>
        <input
          type="text"
          placeholder="Title"
          value={newVideo.title}
          onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newVideo.description}
          onChange={e => setNewVideo({ ...newVideo, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newVideo.videoUrl}
          onChange={e => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
        />
        {newVideo.tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Tag ${index + 1}`}
            value={tag}
            onChange={e => {
              const tags = [...newVideo.tags];
              tags[index] = e.target.value;
              setNewVideo({ ...newVideo, tags });
            }}
          />
        ))}
        <button onClick={handleAddVideo}>Add Video</button>
      </div>
    </div>
  );
};

export default AdminVideoTutorial;

