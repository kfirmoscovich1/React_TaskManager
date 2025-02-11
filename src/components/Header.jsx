import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../service/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/taskBoard">Task Manager</Link>
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/taskBoard">Task Board</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/create">Create Task</Link>
            </li>
          </ul>
        </div>
        <span className="nav-link text-danger" role="button" onClick={handleLogout}>Logout</span>
      </div>
    </nav>
  );
};