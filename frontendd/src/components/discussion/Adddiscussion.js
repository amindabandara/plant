import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../dashboard/Usenavbar';

const DiscussionComponent = () => {
  const [threads, setThreads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [threadsPerPage] = useState(4);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get('http://localhost:5003/threadmanager/');
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching discussion threads:', error);
      }
    };

    fetchThreads();
  }, []);

  // Calculate the indices of the threads to display
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(threads.length / threadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <UserNavbar />
      <h2>Discussion Threads</h2>
      {threads.length === 0 ? (
        <p>No discussions available.</p>
      ) : (
        <>
          <ul>
            {currentThreads.map(thread => (
              <li key={thread._id}>
                <h3>{thread.title}</h3>
                <p>{thread.description}</p>
                {/* Link or button to view thread details */}
                <a href={`/thread/${thread._id}`}>View Thread</a>
              </li>
            ))}
          </ul>
          <div>
            {pageNumbers.map(number => (
              <button key={number} onClick={() => paginate(number)}>
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DiscussionComponent;
