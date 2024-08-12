import React, { useState } from 'react';
import './Login.css'; // Ensure this path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Correctly access environment variable
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5003';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state while submitting

    axios.post(`${apiUrl}/login`, formData)
      .then(response => {
        setLoading(false);
        console.log('Login response:', response.data);
        if (response.data.status === 'Success') {
          localStorage.setItem('token', response.data.token); // Store token
          localStorage.setItem('isAdmin', response.data.isAdmin); // Store isAdmin flag
          console.log('Token stored:', response.data.token);

          // Navigate based on admin status
          if (response.data.isAdmin) {
            navigate('/admin/dashboard'); // Navigate to admin dashboard
            console.log('Navigating to admin dashboard...');
          } else {
            navigate('/dashboard'); // Navigate to home page
            console.log('Navigating to home...');
          }
        } else {
          // Set error message if login fails
          setError('Invalid email or password');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Login error:', error);
        setError('Something went wrong. Please try again.'); // Generic error message
      });
  };

  return (
    <div className="login-page">
      <div className="background-heading">Planting Guides</div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
