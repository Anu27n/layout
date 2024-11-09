import React, { useState } from 'react';
import './LoginForm.css';  // Importing the component-specific CSS

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Login Data:', formData);
    } else {
      // Handle registration logic
      console.log('Registration Data:', formData);
    }
  };

  return (
    <div className="login-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>{isLogin ? 'Email' : 'Username'}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-link">
        {isLogin ? 'Don\'t have an account? Register here' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default LoginForm;