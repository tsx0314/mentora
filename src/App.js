import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import './App.css';
// Import the logo image
import logo from './PSA-Logo-Piano-Black.png';

function App() {
  return (
    <Box className="App" sx={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#282c34' }}>
      
      {/* Logo Image */}
      <Box component="img" src={logo} alt="PSA Logo" sx={{ width: '200px', marginBottom: '20px' }} />

      {/* Welcome message */}
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Roboto',  color: 'white' }}>
        Welcome to Mentora!
      </Typography>

      {/* Navigation Links */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Button variant="contained" color="primary" component={Link} to="/signup" sx={{ fontFamily: 'Roboto', fontSize: '1.2rem', borderRadius: '50px', padding: '10px 30px' }}>
          Signup Page
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ fontFamily: 'Roboto', fontSize: '1.2rem', borderRadius: '50px', padding: '10px 30px' }}>
          Login Page
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/matching" sx={{ fontFamily: 'Roboto', fontSize: '1.2rem', borderRadius: '50px', padding: '10px 30px' }}>
          Matching Page
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/resources" sx={{ fontFamily: 'Roboto', fontSize: '1.2rem', borderRadius: '50px', padding: '10px 30px' }}>
          Resource Page
        </Button>
      </Box>
    </Box>
  );
}

export default App;
