// frontend/src/components/VideoTutorial.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../dashboard/Usenavbar';

const VideoTutorial = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5003/videomanager/')
      .then(response => setVideos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <UserNavbar/>
      <h1>Video Tutorials</h1>
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video width="320" height="240" controls>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Tags: {video.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoTutorial;
