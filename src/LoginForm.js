import React, { useState } from 'react';
import './LoginForm.css';
import { supabase } from './supabaseClient'; // Import Supabase client

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    mobile: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      companyName: '',
      mobile: '',
      location: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const showErrorWithTimeout = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
    setTimeout(() => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }, 3000);
  };

  const handleRegister = async () => {
    try {
      // Check if the email is already registered
      const { data: existingUser, error: fetchError } = await supabase
        .from('user')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (fetchError) {
        console.error('Error checking user:', fetchError.message);
        return;
      }

      if (existingUser) {
        showErrorWithTimeout('email', 'Email is already registered.');
        return;
      }

      // Proceed with registration if email is not found
      const { data, error } = await supabase.from('user').insert([
        {
          email: formData.email,
          companyName: formData.companyName,
          mobile: formData.mobile,
          location: formData.location,
          password: formData.password, // Store password securely in production
        },
      ]);

      if (error) {
        console.error('Error registering:', error.message);
        showErrorWithTimeout('email', 'Registration failed. Please try again.');
      } else {
        console.log('Registration successful:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      // Check if the email and password match
      const { data, error } = await supabase
        .from('user')
        .select('email, password')
        .eq('email', formData.email)
        .single();

      if (error || !data) {
        showErrorWithTimeout('email', 'Email not registered or incorrect.');
        return;
      }

      if (data.password !== formData.password) {
        showErrorWithTimeout('password', 'Incorrect password.');
        return;
      }

      console.log('Login successful:', data);
      // Redirect or perform actions after successful login
    } catch (error) {
      console.error('Unexpected error during login:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!isLogin) {
      if (!passwordRegex.test(formData.password)) {
        showErrorWithTimeout(
          'password',
          'Password must be at least 8 characters, contain one uppercase, one lowercase, one number, and one symbol.'
        );
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showErrorWithTimeout('confirmPassword', 'Passwords do not match.');
        return;
      }
      handleRegister(); // Call register function on successful validation
    } else {
      handleLogin(); // Call login function for login
    }
  };
  
  return (
    <div className="login-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email Id <span className="error-message">{errors.email}</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Email Address"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Company Name <span className="error-message">{errors.companyName}</span></label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter Company Name"
            />
          </div>
        )}
        {!isLogin && (
          <div className="form-group">
            <label>Mobile Number <span className="error-message">{errors.mobile}</span></label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter Mobile Number"
            />
          </div>
        )}
        {!isLogin && (
          <div className="form-group">
            <label>Location <span className="error-message">{errors.location}</span></label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter Location"
            />
          </div>
        )}
        <div className="form-group">
          <label>Password <span className="error-message">{errors.password}</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password <span className="error-message">{errors.confirmPassword}</span></label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter Password"
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-link">
        {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default LoginForm;