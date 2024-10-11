import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Mentora!
        </p>
        <a>
          <Link className="App-link" to="/signup">
          Sign Up
          </Link>
        </a>
        <a>
          <Link className="App-link" to="/login">
          Log In
          </Link>
        </a>
      </header>

      <h1>Welcome to the Application</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login Page</Link></li>
          <li><Link to="/matching">Matching Page</Link></li>
          <li><Link to="/resources">Resource Page</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;