import React from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Grid, Container, Paper, Button, Avatar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';

function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <div style={{ backgroundColor: '#2c2c2c', minHeight: '100vh', padding: '20px' }}>
      {/* Header Section with Tabs */}
      <AppBar position="static" style={{ backgroundColor: '#1b1b1b' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {/* Logo Image */}
            <Avatar src="/path/to/logo.png" alt="Logo" style={{ marginRight: '20px' }} />
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => navigate(newValue)}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: '#ffffff' } }}
            >
              <Tab
                label="Match"
                value="/matching"
                component={Link}
                to="/matching"
                style={{
                  color: currentTab === '/matching' ? '#ffffff' : '#bbbbbb',
                  backgroundColor: currentTab === '/matching' ? '#333333' : 'inherit',
                }}
              />
              <Tab
                label="Resources"
                value="/resources"
                component={Link}
                to="/resources"
                style={{
                  color: currentTab === '/resources' ? '#ffffff' : '#bbbbbb',
                  backgroundColor: currentTab === '/resources' ? '#333333' : 'inherit',
                }}
              />
            </Tabs>
          </Box>
          {/* Profile Image */}
          <Avatar src="/path/to/profile.jpg" alt="Profile Picture" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" style={{ marginTop: '30px' }}>
        {/* Intro Section */}
        <Paper style={{ padding: '20px', marginBottom: '30px', backgroundColor: '#333333', color: '#ffffff' }}>
          <Typography variant="h5" gutterBottom>
            Intro:
          </Typography>
          <Typography variant="body1">
            Your introduction text goes here. You can describe what this page is about or provide instructions for the user.
          </Typography>
        </Paper>

        {/* Input Fields Section */}
        <Grid container spacing={4} style={{ marginBottom: '30px' }}>
          {['Field 1', 'Field 2', 'Field 3', 'Field 4', 'Field 5', 'Field 6'].map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={field}
                variant="outlined"
                InputProps={{ style: { color: '#ffffff' } }}
                InputLabelProps={{ style: { color: '#ffffff' } }}
                style={{ backgroundColor: '#444444', borderRadius: '8px' }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Submit Button Section */}
        <Box textAlign="center" marginTop="30px" marginBottom="30px">
          <Button variant="contained" style={{ backgroundColor: '#555555', color: '#ffffff' }}>
            Submit
          </Button>
        </Box>

        {/* Output Section */}
        <Paper style={{ padding: '20px', backgroundColor: '#333333', color: '#ffffff' }}>
          <Typography variant="h6" gutterBottom>
            Output:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            placeholder="Output will be displayed here..."
            InputProps={{ style: { color: '#ffffff' } }}
            InputLabelProps={{ style: { color: '#ffffff' } }}
            style={{ backgroundColor: '#444444', borderRadius: '8px' }}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default MatchingPage;
