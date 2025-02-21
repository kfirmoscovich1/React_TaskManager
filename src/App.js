<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './service/firebase';
import TaskBoard from './components/TaskBoard';
import CreateTaskForm from './components/CreateTaskForm';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user && <Header />}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/taskBoard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taskBoard" element={user ? <TaskBoard /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreateTaskForm /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <History />
    </Router>
  );
}

=======
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './service/firebase';
import TaskBoard from './components/TaskBoard';
import CreateTaskForm from './components/CreateTaskForm';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user && <Header />}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/taskBoard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/taskBoard" element={user ? <TaskBoard /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreateTaskForm /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <History />
    </Router>
  );
}

>>>>>>> b892819 (Initial commit)
export default App;