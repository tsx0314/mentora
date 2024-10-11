import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Mentora!
        </p>
        <a
          className="App-link"
          href="signin.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign In
        </a>
        <a
          className="App-link"
          href="login.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log In
        </a>
      </header>
    </div>
  );
}

export default App;
