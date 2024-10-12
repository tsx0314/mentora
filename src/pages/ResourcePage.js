import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Avatar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';

function ResourcePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <div style={{ backgroundColor: '#0A0F1F', minHeight: '100vh', fontFamily: 'Myriad' }}>
      {/* Header Section */}
      <AppBar position="static" style={{ backgroundColor: '#161A2A' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Avatar src={require('../psa_logo.png')} alt="Logo" style={{ marginRight: '20px' }} />
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => navigate(newValue)}
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: '#61dafb' } }}
            >
              <Tab
                label="Match"
                value="/matching"
                component={Link}
                to="/matching"
                style={{
                  color: currentTab === '/matching' ? '#ffffff' : '#bbbbbb',
                  backgroundColor: currentTab === '/matching' ? '#333333' : 'inherit',
                  fontFamily: 'Myriad',
                  fontWeight: 'bold',
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
                  fontFamily: 'Myriad',
                  fontWeight: 'bold',
                }}
              />
            </Tabs>
          </Box>
          <Avatar src={require('../user.png')} alt="Profile Picture" />
        </Toolbar>
      </AppBar>

      {/* Full-Width Introduction Section */}
      <Container maxWidth="lg" style={{ marginTop: '30px', fontFamily: 'Myriad' }}>
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            backgroundColor: '#111c30',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #61dafb',
            marginBottom: '30px',
          }}
        >
          <Typography variant="h5" style={{ fontFamily: 'Myriad', textAlign: 'center', fontWeight: 'bold' }}>
            Learning Resources Centre
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
            Tell us your current position and career aspiration to get the best learning resources!
          </Typography>
        </Paper>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={0} justifyContent="space-between" alignItems="center">
          {/* Left Column - Current */}
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  backgroundColor: '#111c30',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: '2px solid #61dafb',
                  height: 'calc(100vh - 300px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Logo for Left Column */}
                <Avatar src={require('../junior.png')} alt="Current Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Current
                </Typography>
              </Paper>
            </Box>
          </Grid>

          {/* Arrow between Left and Middle Column */}
          <Grid item xs="auto" style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={require('../arrow.png')} alt="Arrow" style={{ width: '40px', height: '40px', marginLeft: '-10px' }} />
          </Grid>

          {/* Middle Column - Output */}
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  backgroundColor: '#111c30',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: '2px solid #61dafb',
                  height: 'calc(100vh - 300px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Logo for Middle Column */}
                <Avatar src={require('../book.png')} alt="Output Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Output
                </Typography>

                {/* Scrollable Inner Box */}
                <Paper
                  elevation={3}
                  style={{
                    width: '90%',
                    height: '70%',
                    padding: '20px',
                    backgroundColor: '#222b3d',
                    color: '#ffffff',
                    borderRadius: '10px',
                    marginTop: '20px',
                    overflowY: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    Your mentor match will appear here.
                  </Typography>
                </Paper>
              </Paper>
            </Box>
          </Grid>

          {/* Arrow between Middle and Right Column */}
          <Grid item xs="auto" style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={require('../arrow.png')} alt="Arrow" style={{ width: '40px', height: '40px', marginLeft: '-10px' }} />
          </Grid>

          {/* Right Column - Aspiring */}
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  backgroundColor: '#111c30',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: '2px solid #61dafb',
                  height: 'calc(100vh - 300px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Logo for Right Column */}
                <Avatar src={require('../expert.png')} alt="Aspiring Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Aspiring
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ResourcePage;
