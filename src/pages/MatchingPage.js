import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Button, Avatar, Tabs, Tab, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';

function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      setOutput(`Extracted skills from ${selectedFile.name}`);
    } else {
      setOutput('No file selected');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px', fontFamily: 'Roboto' }}>
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
                  fontFamily: 'Roboto',
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
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                }}
              />
            </Tabs>
          </Box>
          {/* Profile Image */}
          <Avatar src="/path/to/profile.jpg" alt="Profile Picture" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" style={{ marginTop: '30px', fontFamily: 'Roboto' }}>
        {/* Intro Section */}
        <Paper
          style={{
            padding: '30px',
            marginBottom: '30px',
            backgroundColor: '#333333',
            color: '#ffffff',
            border: '2px solid #61dafb',
            borderRadius: '10px',
          }}
        >
          <Typography variant="h5" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
            Welcome to Your Mentorship Matchmaking Hub!
          </Typography>

          <Typography variant="body1" paragraph style={{ fontFamily: 'Roboto' }}>
            Embark on a journey of growth and discovery with our personalized mentorship
            matching platform. We're excited to help you connect with mentors who can
            guide you toward achieving your professional goals.
          </Typography>

          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
            How It Works:
          </Typography>

          {/* How It Works - Tell Us About Yourself Section */}
          <Paper
            style={{
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#444444',
              color: '#ffffff',
              border: '2px solid #61dafb',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
              Tell Us About Yourself:
            </Typography>
            <Typography variant="body1" component="div" style={{ fontFamily: 'Roboto' }}>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>
                  <strong>Upload Your Resume:</strong> Let us know about your skills, career
                  aspirations, interests, and the areas you'd like to develop.
                </li>
              </ul>
            </Typography>
          </Paper>

          {/* How It Works - Intelligent Matching Section */}
          <Paper
            style={{
              padding: '20px',
              backgroundColor: '#444444',
              color: '#ffffff',
              border: '2px solid #61dafb',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
              Intelligent Matching:
            </Typography>
            <Typography variant="body1" component="div" style={{ fontFamily: 'Roboto' }}>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                <li>
                  <strong>AI-Powered Recommendations:</strong> Our advanced AI
                  analyzes your input to understand your unique needs.
                </li>
                <li>
                  <strong>Personalized Mentor List:</strong> Receive tailored mentor
                  suggestions who align with your goals and interests.
                </li>
              </ul>
            </Typography>
          </Paper>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
            Empower your future by finding the right mentor today!
          </Typography>
        </Paper>

        {/* File Upload Section */}
        <Grid container spacing={4} style={{ marginBottom: '30px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px', backgroundColor: '#444444', color: '#ffffff', border: '2px solid #61dafb', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
                Upload your file (PDF/DOCX):
              </Typography>
              <Input
                type="file"
                inputProps={{ accept: '.pdf, .docx' }}
                onChange={handleFileUpload}
                style={{ color: '#ffffff', fontFamily: 'Roboto' }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Submit Button Section */}
        <Box textAlign="center" marginTop="30px" marginBottom="30px">
          <Button variant="contained" style={{ backgroundColor: '#61dafb', color: '#ffffff', fontFamily: 'Roboto', fontWeight: 'bold'}} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>

        {/* Output Section */}
        <Paper style={{ padding: '20px', backgroundColor: '#333333', color: '#ffffff', border: '2px solid #61dafb', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
            Output:
          </Typography>
          <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>{output}</Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default MatchingPage;
