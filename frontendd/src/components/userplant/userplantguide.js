import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../dashboard/Usenavbar';
import './PlantGuide.css'; // Import the CSS file for styling

const PlantGuide = () => {
  const [guides, setGuides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guidesPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5003/plantmanager/')
      .then(response => setGuides(response.data))
      .catch(error => console.error(error));
  }, []);

  // Filter guides by title
  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the indices of the guides to display
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGuides.length / guidesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="main-content">
      <UserNavbar />
      <h1>Planting Guides</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search guides by title"
        />
      </div>
      <table className="guide-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Difficulty</th>
            <th>Conditions</th>
            <th className="steps-column">Steps</th>
          </tr>
        </thead>
        <tbody>
          {currentGuides.map(guide => (
            <tr key={guide._id}>
              <td>{guide.title}</td>
              <td>{guide.description}</td>
              <td>{guide.plantType}</td>
              <td>{guide.difficulty}</td>
              <td>{guide.conditions}</td>
              <td className="steps-column">
                <ul>
                  {guide.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            aria-label={`Go to page ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlantGuide;




