import React, { useState } from 'react';
import SoloAlert from 'soloalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from "../Usenavbar";
import './AddStory.css'; // Import the CSS file

export default function AddStory() {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [story, setStory] = useState("");
  const navigate = useNavigate();

  async function submitData(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!username || !story) {
        SoloAlert.alert({
          title: "Oops!",
          body: "Please fill all fields",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () { },
        });
      } else {
        const newDetails = { username, story };
        const response = await axios.post("http://localhost:5003/storymanager/addstory", newDetails); // Adjust the URL to your endpoint
        if (response.status === 200) {
          SoloAlert.alert({
            title: "Success!",
            body: "Story added successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
            onOk: function () { },
          });
          clearForm();
          navigate('/success-stories'); // Navigate to the success stories page
        } else {
          throw new Error(response.data.error || "Failed to add story");
        }
      }
    } catch (err) {
      console.error(err.message);
      SoloAlert.alert({
        title: "Error",
        body: "An error occurred while submitting your story.",
        icon: "error",
        theme: "dark",
        useTransparency: true,
        onOk: function () { },
      });
    }
    setLoading(false);
  }

  function clearForm() {
    setUsername("");
    setStory("");
  }

  return (
    <div className="container custom-background">
      <UserNavbar />
      <div className="row">
        <div className="col-12">
          <div className="pb-2 px-3">
            <h2>Add Success Story</h2>
          </div>
        </div>
      </div>
      <br />
      <form className="row g-3 needs-validation" id="inputForm" onSubmit={submitData} noValidate>
        <div className="col-md-4 position-relative">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-4 position-relative">
          <label htmlFor="story" className="form-label">Story</label>
          <textarea
            className="form-control"
            id="story"
            required
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="col-12" style={{ marginTop: "50px", marginLeft: "65%" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearForm}
          >
            <i className="fa fa-ban"></i> Clear Form
          </button>&nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            <i className="fa fa-file-export"></i> {isLoading ? 'Sending..' : 'Submit Form'}
          </button>
        </div>
      </form>
    </div>
  );
}




