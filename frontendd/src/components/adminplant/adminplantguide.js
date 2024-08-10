import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../dashboard/Admin/Adminnavbar';
import './AdminPlantGuide.css'; // Import the CSS file for styling

const AdminPlantGuide = () => {
  const [guides, setGuides] = useState([]);
  const [newGuide, setNewGuide] = useState({
    title: '',
    description: '',
    plantType: '',
    difficulty: '',
    conditions: '',
    steps: [''],
  });
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:5003/plantmanager/')
      .then(response => setGuides(response.data))
      .catch(error => console.error(error));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!newGuide.title) errors.title = 'Title is required';
    if (!newGuide.description) errors.description = 'Description is required';
    if (!newGuide.plantType) errors.plantType = 'Plant Type is required';
    if (!newGuide.difficulty) errors.difficulty = 'Difficulty is required';
    if (!newGuide.conditions) errors.conditions = 'Conditions are required';
    if (newGuide.steps.some(step => !step)) errors.steps = 'All steps must be filled out';
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddGuide = () => {
    if (validateForm()) {
      axios.post('http://localhost:5003/plantmanager/add', newGuide)
        .then(response => {
          setGuides([...guides, response.data]);
          setNewGuide({
            title: '',
            description: '',
            plantType: '',
            difficulty: '',
            conditions: '',
            steps: [''],
          });
          setErrors({});
        })
        .catch(error => console.error(error));
    }
  };

  const handleAddStep = () => {
    setNewGuide({ ...newGuide, steps: [...newGuide.steps, ''] });
  };

  return (
    <div className="admin-plant-guide-container">
      <AdminNavbar />
      <h1>Admin - Manage Planting Guides</h1>
      <div className="form-container">
        <h2>Add New Guide</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Title"
            value={newGuide.title}
            onChange={e => setNewGuide({ ...newGuide, title: e.target.value })}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <textarea
            placeholder="Description"
            value={newGuide.description}
            onChange={e => setNewGuide({ ...newGuide, description: e.target.value })}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Plant Type"
            value={newGuide.plantType}
            onChange={e => setNewGuide({ ...newGuide, plantType: e.target.value })}
          />
          {errors.plantType && <p className="error">{errors.plantType}</p>}
          <input
            type="text"
            placeholder="Difficulty"
            value={newGuide.difficulty}
            onChange={e => setNewGuide({ ...newGuide, difficulty: e.target.value })}
          />
          {errors.difficulty && <p className="error">{errors.difficulty}</p>}
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Conditions"
            value={newGuide.conditions}
            onChange={e => setNewGuide({ ...newGuide, conditions: e.target.value })}
          />
          {errors.conditions && <p className="error">{errors.conditions}</p>}
        </div>
        <div className="form-steps">
          {newGuide.steps.map((step, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={e => {
                const steps = [...newGuide.steps];
                steps[index] = e.target.value;
                setNewGuide({ ...newGuide, steps });
              }}
            />
          ))}
          {errors.steps && <p className="error">{errors.steps}</p>}
          <button type="button" onClick={handleAddStep}>Add Another Step</button>
        </div>
        <button onClick={handleAddGuide}>Add Guide</button>
      </div>
    </div>
  );
};

export default AdminPlantGuide;


