import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Button, Avatar, Tabs, Tab, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import CloseIcon from '@mui/icons-material/Close'; // Importing Close Icons

import axios from 'axios';
import mammoth from 'mammoth'; // For DOCX processing
import * as pdfjsLib from 'pdfjs-dist'; // For PDF parsing

import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { db } from "../firebase"; // Firebase config


function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null); // Now stores actual file object
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file upload and store the actual file object
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the file object
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Reset selected file
  };

  // Extract text from DOCX
  const extractDocxText = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (error) {
      console.error('Error extracting DOCX:', error);
      return '';
    }
  };

  // Extract text from PDF
  const extractPdfText = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let text = '';

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(' ');
        text += pageText + ' ';
      }

      return text;
    } catch (error) {
      console.error('Error extracting PDF:', error);
      return '';
    }
  };

  // Fecth from firebase
  const fetchMentors = async () => {
    const mentorsCollection = collection(db, "mentors"); // Collection is 'mentors'
    const mentorsSnapshot = await getDocs(mentorsCollection);
    const mentorsList = mentorsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(mentorsList);
    return mentorsList;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile) return alert('Please upload a file first.');
    setLoading(true);

    try {
      let fileText = '';
      const fileType = selectedFile.type;

      console.log('Uploaded file type:', fileType);

      // Extract text based on file type
      if (fileType === 'application/pdf') {
        fileText = await extractPdfText(selectedFile);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        selectedFile.name.endsWith('.docx') // Use file extension as fallback
      ) {
        fileText = await extractDocxText(selectedFile);
      } else {
        return alert('Unsupported file type. Please upload a PDF or DOCX file.');
      }
      // Step 1: Call GPT-4 API to extract skills from the resume
      const gptResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // or 'gpt-4-turbo'
          messages: [
            { role: 'system', content: 'You are a resume parser. Extract the relevant skills from this resume text.' },
            { role: 'user', content: fileText },
          ],
          temperature: 0.2, // Lower temperature for factual responses
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use the environment variable for the OpenAI key
        }
      });

      // Extract skills from GPT response
      const extractedSkills = gptResponse.data.choices[0].message.content.split(",").map(skill => skill.trim().toLowerCase());
      console.log("Extracted Skills:", extractedSkills);

      // Step 2: Fetch mentors from Firebase
      const mentors = await fetchMentors();
      console.log("Mentors from Firebase:", mentors);

      // Step 3: Use GPT-4 again to match the best mentor based on skills
      const matchResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // or 'gpt-4-turbo'
          messages: [
            { role: 'system', content: 'You are a matchmaker. Based on the following extracted skillsets from the resume and the mentor list, find the most possible mentor. They need to have similar skillsets.' },
            { role: 'user', content: `Skills: ${extractedSkills.join(", ")} Mentors: ${JSON.stringify(mentors.map(mentor => ({ name: mentor.name, email: mentor.email, skills: mentor.skills })))}.` }
          ],
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use the environment variable for the OpenAI key
        }
      });

      const bestMatch = matchResponse.data.choices[0].message.content;
      console.log("Best Matched Mentor:", bestMatch);
      
      // Display the best match
      setOutput(bestMatch);

    } catch (error) {
      console.error('Error with GPT-4 API or Firebase:', error);
      setOutput('An error occurred while processing the resume or fetching mentors.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0A0F1F', minHeight: '100vh', fontFamily: 'Myriad' }}>
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

      <Container maxWidth="lg">
        <Grid container spacing={4}>
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
                  height: 'calc(100vh - 300px)',
                }}
              >
                <Avatar src={require('../logo1.png')} alt="Upload Logo" style={{ width: '60px', height: '60px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Upload Resume
                </Typography>
                <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    Upload your resume for us to analyze your skills and provide personalized mentor matches.
                  </Typography>

                  {/* Choose File Button */}
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Button
                      variant="outlined" // Changed to outlined for visibility
                      component="label"
                      style={{
                        backgroundColor: '#111c30', // Same as container bg color
                        border: '2px solid #61dafb', // Border color matching the background
                        color: '#61dafb', // Text color
                        fontFamily: 'Myriad',
                        fontWeight: 'bold',
                        padding: '5px 10px', // Shorter padding
                        borderRadius: '30px',
                        fontSize: '1rem',
                        marginBottom: '5px',
                        width: '150px', // Set specific width
                      }}
                    >
                      Choose File
                      <Input
                        type="file"
                        inputProps={{ accept: '.pdf, .docx' }}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }} // Hide the actual input
                      />
                    </Button>
                    {/* File name display and cross icon */}
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" style={{ color: '#ffffff', marginRight: '5px' }}>
                        {selectedFile ? selectedFile.name : 'No file chosen.'}
                      </Typography>
                      {selectedFile && (
                        <CloseIcon
                          onClick={handleRemoveFile}
                          style={{
                            cursor: 'pointer',
                            color: '#61dafb', // Same color as the submit button background
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Centered Submit Button */}
                  <Box display="flex" justifyContent="center" marginTop="10px">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#61dafb',
                        color: '#0A0F1F',
                        fontFamily: 'Myriad',
                        fontWeight: 'bold',
                        padding: '10px 20px', // Shorter padding
                        marginBottom: '10px',
                        borderRadius: '30px',
                        fontSize: '1rem',
                        width: '300px', // 
                      }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>

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
                  height: 'calc(100vh - 300px)',
                }}
              >
                <Avatar src={require('../logo2.png')} alt="Output Logo" style={{ width: '60px', height: '60px' }} />
                <Typography variant="h6" style={{ fontFamily: 'Myriad', fontWeight: 'bold', marginTop: '10px' }}>
                  Matching Output
                </Typography>
                <Paper
                  elevation={3}
                  style={{
                    width: '90%',  // Matches the width of the outer container
                    height: '100%',  // Increased height by 1/5
                    padding: '20px',
                    backgroundColor: '#222b3d',
                    color: '#ffffff',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    marginBottom: '10px',
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
