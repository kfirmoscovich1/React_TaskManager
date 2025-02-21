<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { loginWithEmail, loginWithGoogle } from '../service/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, firestore } from '../service/firebase';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import googleLogo from '../images/google.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/taskBoard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail(email, password);
      navigate('/taskBoard');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(`Login failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Reference to the user document
      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      // Create user if not exists
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || 'No Name',
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        // Create tasks subcollection with a default task
        const tasksCollectionRef = collection(firestore, 'users', user.uid, 'tasks');
        await setDoc(doc(tasksCollectionRef), {
          title: 'Welcome Task',
          description: 'This is your first task!',
          createdAt: new Date().toISOString(),
          completed: false,
        });
      }

      navigate('/taskBoard');
    } catch (err) {
      console.error('Google login failed:', err);
      setError(`Google login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="mb-3">
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center my-3 d-flex align-items-center">
          <div className="flex-grow-1 border-top"></div>
          <span className="px-2 text-muted">or</span>
          <div className="flex-grow-1 border-top"></div>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-light w-100 mb-3 border d-flex align-items-center justify-content-center" disabled={loading}>
          <img src={googleLogo} alt="Google logo" style={{ width: '20px', marginRight: '10px' }} />
          {loading ? 'Logging in...' : 'Login with Google'}
        </button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
=======
import React, { useState, useEffect } from 'react';
import { loginWithEmail, loginWithGoogle } from '../service/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth, firestore } from '../service/firebase';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import googleLogo from '../images/google.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/taskBoard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail(email, password);
      navigate('/taskBoard');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(`Login failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Reference to the user document
      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      // Create user if not exists
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || 'No Name',
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        // Create tasks subcollection with a default task
        const tasksCollectionRef = collection(firestore, 'users', user.uid, 'tasks');
        await setDoc(doc(tasksCollectionRef), {
          title: 'Welcome Task',
          description: 'This is your first task!',
          createdAt: new Date().toISOString(),
          completed: false,
        });
      }

      navigate('/taskBoard');
    } catch (err) {
      console.error('Google login failed:', err);
      setError(`Google login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="mb-3">
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center my-3 d-flex align-items-center">
          <div className="flex-grow-1 border-top"></div>
          <span className="px-2 text-muted">or</span>
          <div className="flex-grow-1 border-top"></div>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-light w-100 mb-3 border d-flex align-items-center justify-content-center" disabled={loading}>
          <img src={googleLogo} alt="Google logo" style={{ width: '20px', marginRight: '10px' }} />
          {loading ? 'Logging in...' : 'Login with Google'}
        </button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
>>>>>>> b892819 (Initial commit)
