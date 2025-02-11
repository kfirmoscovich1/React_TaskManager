import React, { useState } from 'react';
import { registerWithEmail } from '../service/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../service/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain only letters and numbers.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    setLoading(true);
    try {
      const user = await registerWithEmail(email, password, fullName);

      // Add user data to Firestore
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        fullName,
        email,
        createdAt: new Date().toISOString(),
      });

      navigate("/taskBoard");
    } catch (err) {
      setError(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister} className="mb-3">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={handleInputChange(setFullName)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
          </div>
          <div className="mb-3">
  <label className="form-label">Password</label>
  <input
    type="text"           // שימו לב שהשתנַּה מ-"password" ל-"text"
    className="form-control"
    id="password"
    value={password}
    onChange={handleInputChange(setPassword)}
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">Confirm Password</label>
  <input
    type="password"       // נשאר "password"
    className="form-control"
    id="rePassword"
    value={rePassword}
    onChange={handleInputChange(setRePassword)}
    required
  />
</div>

          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}


