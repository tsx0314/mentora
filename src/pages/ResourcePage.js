import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Avatar, Tabs, Tab,
  Select, MenuItem, FormControl, InputLabel, TextField, Chip, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';

function ResourcePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  // State for left column (Current)
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [currentSkills, setCurrentSkills] = useState([]);
  const [currentSkillInput, setCurrentSkillInput] = useState('');
  const [currentExperienceLevel, setCurrentExperienceLevel] = useState('');

  // State for right column (Aspiring)
  const [aspiringInput, setAspiringInput] = useState(''); // State for aspiration text input

  // State for GPT response
  const [gptResponse, setGptResponse] = useState('');

  // Handle changes to current department
  const handleCurrentDepartmentChange = (event) => {
    setCurrentDepartment(event.target.value);
  };

  // Handle adding a current skill
  const handleAddCurrentSkill = (event) => {
    if (event.key === 'Enter' && currentSkillInput.trim()) {
      if (!currentSkills.includes(currentSkillInput.trim())) {
        setCurrentSkills([...currentSkills, currentSkillInput.trim()]);
      }
      setCurrentSkillInput('');
    }
  };

  // Handle deleting a current skill
  const handleDeleteCurrentSkill = (skillToDelete) => {
    setCurrentSkills(currentSkills.filter((skill) => skill !== skillToDelete));
  };

  // Function to submit aspirations and generate a career pathway
  const handleAspirationSubmit = async () => {
    const systemPrompt = `You are an expert career advisor. You help users identify necessary skills and courses based on their current role and their career aspirations.`;

    const userPrompt = `
      I am currently working in the ${currentDepartment} department at an ${currentExperienceLevel} level.
      My current skills include: ${currentSkills.join(', ')}.
      I aspire to work in the ${aspiringDepartment} department. My aspirations are: ${aspiringInput}.
      Provide me with a career pathway.
      Please only reply the skills that I need to learn and the possible courses in point form.
      Do not add any greeting messages.
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',  // Using GPT-4
          messages: [
            { role: 'system', content: systemPrompt }, // System message to set context
            { role: 'user', content: userPrompt }, // User's input and request for advice
          ],
          temperature: 0.7, // Control creativity and randomness in responses
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          }
        }
      );

      // Set GPT-4 response to state to display in the middle column
      setGptResponse(response.data.choices[0].message.content);

    } catch (error) {
      console.error('Error calling GPT-4 API:', error);
    }
  };

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
          <Typography variant="body1" style={{ fontFamily:'Myriad',textAlign: 'center', marginTop: '10px' }}>
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
                  fontFamily:'Myriad',
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
                <Avatar src={require('../junior.png')} alt="Current Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px', marginBottom:'15px' }}>
                  Current Role
                </Typography>

                {/* Department Dropdown */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                  <InputLabel style={{ fontFamily:'Myriad', color: '#ffffff' }}>Department</InputLabel>
                  <Select
                    value={currentDepartment}
                    onChange={handleCurrentDepartmentChange}
                    label="Department"
                    sx={{
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                    }}
                  >
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Operations">Operations</MenuItem>
                  </Select>
                </FormControl>

                {/* Experience Level Dropdown */}
                <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                  <InputLabel style={{fontFamily:'Myriad', color: '#ffffff' }}>Experience Level</InputLabel>
                  <Select
                    value={currentExperienceLevel}
                    onChange={(event) => setCurrentExperienceLevel(event.target.value)}
                    label="Experience Level"
                    sx={{
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                    }}
                  >
                    <MenuItem value="Fresh Graduate">Fresh Graduate</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                    <MenuItem value="Director and above">Director and above</MenuItem>
                  </Select>
                </FormControl>

                {/* Skill Input */}
                <TextField
                  label="Add a Skill"
                  variant="outlined"
                  value={currentSkillInput}
                  onChange={(e) => setCurrentSkillInput(e.target.value)}
                  onKeyDown={handleAddCurrentSkill}
                  placeholder="Press Enter to add a skill"
                  fullWidth
                  style={{ marginTop: '20px' }}
                  InputLabelProps={{
                    style: { fontFamily:'Myriad', color: '#ffffff' },
                  }}
                  InputProps={{
                    style: {fontFamily:'Myriad', color: '#ffffff' },
                    sx: {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                    },
                  }}
                />
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleDeleteCurrentSkill(skill)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Arrow between Left and Middle Column */}
          <Grid item xs="auto" style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={require('../arrow.png')} alt="Arrow" style={{ width: '40px', height: '20px', marginLeft: '-10px', marginRight: '-30px' }} />
          </Grid>

          {/* Middle Column - Output */}
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  marginLeft: '20px',
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
                <Avatar src={require('../book.png')} alt="Pathway Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Your Career Pathway
                </Typography>
                <Box
                  sx={{
                    height: '200px', // Set the height as needed
                    overflowY: 'auto', // Enable vertical scrolling
                    padding: '10px',
                    border: '1px solid #61dafb', // Optional: to differentiate the scrolling box
                    borderRadius: '5px', // Optional: add some border-radius for a better look
                    backgroundColor: '#111c30', // Background color to match the design
                  }}
                >
                  <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
                    {gptResponse || 'Please select a department and add skills to generate pathways.'}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Arrow between Middle Column and Right Column */}
          <Grid item xs="auto" style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={require('../arrow.png')} alt="Arrow" style={{ width: '40px', height: '20px', marginLeft: '-10px', marginRight: '-30px'  }} />
          </Grid>

          {/* Right Column - Aspiring */}
          <Grid item xs={3}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
              <Paper
                elevation={3}
                style={{
                  marginLeft: '20px',
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
                <Avatar src={require('../expert.png')} alt="Aspiring Logo" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Aspiration
                </Typography>

                {/* Aspiration Input Text Box */}
                <TextField
                  label="Enter your aspiration"
                  variant="outlined"
                  value={aspiringInput}
                  onChange={(e) => setAspiringInput(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  style={{ marginTop: '35px' }}
                  InputLabelProps={{
                    style: { fontFamily:'Myriad', color: '#ffffff' },
                  }}
                  InputProps={{
                    style: { fontFamily:'Myriad', color: '#ffffff' },
                    sx: {
                      height: '242px',
                      display: 'flex', // Use flex display to align content
                      alignItems: 'flex-start', // Align items to the top
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#61dafb',
                      },
                    }}
                  }
                />

                {/* Submit Button */}
                <Button
                  variant="contained"
                  onClick={handleAspirationSubmit}
                  style={{
                    fontFamily: 'Myriad',
                    backgroundColor: '#61dafb',
                    color: '#0A0F1F',
                    fontWeight: 'bold',
                    marginTop: '20px',
                    width: '100%',
                  }}
                >
                  Submit
                </Button>

              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ResourcePage;
