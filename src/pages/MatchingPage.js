import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Button, Avatar, Tabs, Tab, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import CloseIcon from '@mui/icons-material/Close'; // Importing Close Icon

function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: file.size, // File size in bytes
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Reset selected file
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      setOutput(`Extracted skills from ${selectedFile.name}`);
    } else {
      setOutput('No file selected');
    }
  };

  return (
    <div style={{ backgroundColor: '#0A0F1F', minHeight: '100vh', fontFamily: 'Myriad' }}>
      {/* Header Section with Tabs */}
      <AppBar position="static" style={{ backgroundColor: '#161A2A' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {/* Logo Image */}
            <Avatar src={require('../logo1.png')} alt="Logo" style={{ marginRight: '20px' }} /> {/* Updated logo1.png */}
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
          {/* Profile Image */}
          <Avatar src={require('../user.png')} alt="Profile Picture" />
        </Toolbar>
      </AppBar>

      {/* Full-Width Introduction Section */}
      <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px', fontFamily: 'Myriad' }}>
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            backgroundColor: '#111c30',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #61dafb',
          }}
        >
          <Typography variant="h5" style={{ fontFamily: 'Myriad', textAlign: 'center', fontWeight: 'bold' }}>
            Welcome to Your Mentorship Matchmaking Hub
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
            Ready to grow? Upload your resume and find the perfect mentor tailored to your career aspirations.
          </Typography>
        </Paper>
      </Container>

      {/* Main Content with Two Columns */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column: Step 1 - Upload Resume */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  backgroundColor: '#111c30',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: '2px solid #61dafb',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'calc(100vh - 300px)', // Slightly longer height
                }}
              >
                <Avatar src={require('../logo1.png')} alt="Upload Logo" style={{ width: '60px', height: '60px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Upload Resume
                </Typography>

                {/* The start of this description is aligned with the inner text box in the right box */}
                <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    Upload your resume for us to analyze your skills and provide personalized mentor matches.
                  </Typography>
                  <Input
                    type="file"
                    inputProps={{ accept: '.pdf, .docx' }}
                    onChange={handleFileUpload}
                    style={{ color: '#ffffff', marginBottom: '20px', fontFamily: 'Myriad' }}
                  />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: '#61dafb',
                      color: '#0A0F1F',
                      fontFamily: 'Myriad',
                      fontWeight: 'bold',
                      padding: '10px 30px',
                      borderRadius: '30px',
                      fontSize: '1rem',
                    }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column: Step 2 - Matching Output */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  padding: '20px',
                  backgroundColor: '#111c30',
                  color: '#ffffff',
                  borderRadius: '10px',
                  border: '2px solid #61dafb',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'calc(100vh - 300px)', // Same longer height
                }}
              >
                <Avatar src={require('../logo2.png')} alt="Output Logo" style={{ width: '60px', height: '60px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Matching Output
                </Typography>
                <Paper
                  elevation={3}
                  style={{
                    width: '90%',  // Longer inner box
                    height: '240px',  // Increased height by 1/5
                    padding: '20px',
                    backgroundColor: '#222b3d',
                    color: '#ffffff',
                    borderRadius: '10px',  // Rounded corners
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                >
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    {output ? output : 'Your mentor match will appear here.'}
                  </Typography>
                </Paper>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MatchingPage;
