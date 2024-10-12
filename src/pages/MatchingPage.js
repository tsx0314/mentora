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
        <Paper style={{ padding: '20px', marginBottom: '30px', backgroundColor: '#333333', color: '#ffffff', border: '2px solid #61dafb' }}>
          <Typography variant="h5" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
            Intro:
          </Typography>
          <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
            Please upload your resume to match your mentor.
          </Typography>
        </Paper>

        {/* File Upload Section */}
        <Grid container spacing={4} style={{ marginBottom: '30px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px', backgroundColor: '#444444', color: '#ffffff', border: '2px solid #61dafb' }}>
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
        <Paper style={{ padding: '20px', backgroundColor: '#333333', color: '#ffffff', border: '2px solid #61dafb'}}>
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
