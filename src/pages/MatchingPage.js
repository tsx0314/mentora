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
      // Placeholder: Integrate GPT API here to process the file
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Call GPT API to extract skills from the file (implementation not included)
      // Example:
      // const response = await extractSkillsFromFile(formData);
      // setOutput(response.data.skills);

      // For now, simulate output
      setOutput(`Extracted skills from ${selectedFile.name}`);
    } else {
      setOutput('No file selected');
    }
  };

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
            Please upload your resume to match your mentor.
          </Typography>
        </Paper>

        {/* File Upload Section */}
        <Grid container spacing={4} style={{ marginBottom: '30px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px', backgroundColor: '#444444', color: '#ffffff', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>
                Upload your file (PDF/DOCX):
              </Typography>
              <Input
                type="file"
                inputProps={{ accept: '.pdf, .docx' }}
                onChange={handleFileUpload}
                style={{ color: '#ffffff' }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Submit Button Section */}
        <Box textAlign="center" marginTop="30px" marginBottom="30px">
          <Button variant="contained" style={{ backgroundColor: '#555555', color: '#ffffff' }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>

        {/* Output Section */}
        <Paper style={{ padding: '20px', backgroundColor: '#333333', color: '#ffffff' }}>
          <Typography variant="h6" gutterBottom>
            Output:
          </Typography>
          <Typography variant="body1">{output}</Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default MatchingPage;
