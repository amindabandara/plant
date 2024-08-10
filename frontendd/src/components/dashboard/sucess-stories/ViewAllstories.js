import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../Usenavbar";
import './ViewStories.css'; // Import the CSS file

export default function ViewStories() {
  const [Allstories, setAllstories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

  useEffect(() => {
    function getAllstories() {
      axios.get("http://localhost:5003/storymanager/")
        .then((res) => {
          setAllstories(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAllstories();
  }, []);

  const filteredStories = Allstories.filter(stories =>
    stories.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  // Slice the stories array to display only the current page stories
  const currentStories = filteredStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );

  return (
    <div>
      <UserNavbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="pb-2 px-3">
              <h2>View Story Details</h2>
              <input
                type="text"
                placeholder="Search by username"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="blue-table">
          <div className="box-view-student">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Story</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStories.map((story) => (
                  <tr key={story._id}>
                    <td>{story.username}</td>
                    <td>{story.story}</td>
                    <td>
                      <Link to={"/success-stories/view/" + story._id} className="Edit">
                        EDIT<i className="far fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span> Page {currentPage} of {totalPages} </span>
              <button
                onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

