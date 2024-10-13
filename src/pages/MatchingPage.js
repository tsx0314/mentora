import React, { useState, useEffect } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { AppBar, Toolbar, Typography, Box, Grid, Container, Paper, Button, Avatar, Tabs, Tab, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import CloseIcon from '@mui/icons-material/Close'; // Importing Close Icon

import axios from 'axios';
import mammoth from 'mammoth'; // For DOCX processing

import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { db } from "../firebase"; // Firebase config

function MatchingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [selectedFile, setSelectedFile] = useState(null); // Now stores actual file object
  const [output, setOutput] = useState(''); // To store the result from GPT-4
  const [loading, setLoading] = useState(false); // To handle loading states

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

  // Typing animation function
  function TypingEffect({ text, speed, delay }) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText + text[index]);
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [index, text, displayedText, speed]);

    useEffect(() => {
      // Delay before starting typing effect
      const startTyping = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, delay);

      return () => clearTimeout(startTyping);
    }, [text, delay]);

    return <span>{displayedText}</span>;
  }

  // Fetch mentors from Firebase
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
      console.log("OpenAI API Key:", process.env.REACT_APP_OPENAI_API_KEY);

      // Extract text based on file type
      if (
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        selectedFile.name.endsWith('.docx') // Use file extension as fallback
      ) {
        fileText = await extractDocxText(selectedFile);
      } else {
        return alert('Unsupported file type. Please upload a DOCX file.');
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
            { role: 'system', content: 'You are a matchmaker. Based on the following extracted skillsets from the resume and the mentor list, find two most possible mentors. They need to have similar skillsets with mentee. Only provide the two recommendation mentors as a JSON array, including all the data of the two mentors in the database.'},
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
            Mentorship Matching
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
            Ready to grow? Upload your resume format and find the perfect mentor tailored to your career aspirations.
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
                  <Typography variant="body1" style={{ textAlign: 'center', justifyContent: 'flex-start' }}> 
                    Please upload the file in .docx format.
                  </Typography>

                  {/* Choose File Button */}
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Button
                      variant="outlined" 
                      component="label"
                      style={{
                        backgroundColor: '#111c30', 
                        border: '2px solid #61dafb', 
                        color: '#61dafb', // Text color
                        fontFamily: 'Myriad',
                        fontWeight: 'bold',
                        padding: '5px 10px', 
                        borderRadius: '30px',
                        fontSize: '1rem',
                        marginBottom: '5px',
                        width: '150px', 
                      }}
                    >
                      Choose File
                      <Input
                        type="file"
                        inputProps={{ accept: '.docx' }}
                        onChange={handleFileUpload}
                        style={{ display: 'none' }} 
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
                            color: '#61dafb', 
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Centered Submit Button */}
                  {/* Centered Submit Button or Processing Message */}
                  <Box display="flex" justifyContent="center" marginTop="10px">
                    {loading ? (
                      <Typography variant="body1" style={{ color: '#61dafb', fontFamily: 'Myriad', fontWeight: 'bold' }}>
                        Processing...
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#61dafb',
                          color: '#0A0F1F',
                          fontFamily: 'Myriad',
                          fontWeight: 'bold',
                          padding: '10px 20px', 
                          marginBottom: '10px',
                          borderRadius: '30px',
                          fontSize: '1rem',
                          width: '300px',
                        }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    )}
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
                    width: '90%', 
                    height: '100%',  
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
                  {output ? (
                    <Box>
                      {JSON.parse(output).map((mentor, index) => (
                        <Box key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #61dafb', paddingBottom: '10px' }}>
                          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#61dafb' }}>
                            <TypingEffect text={mentor.name || "No Name Available"} speed={100} delay={200} />
                          </Typography>
                          <Typography variant="body1" style={{ color: '#ffffff' }}>
                            <strong>Email:</strong> 
                            <TypingEffect
                              text={mentor.email}
                              speed={100}
                              typingDelay={400}
                              displayTextRenderer={(text) => (
                                <span>{text}</span>
                              )}
                            />
                          </Typography>
                          <Typography variant="body1" style={{ color: '#ffffff' }}>
                            <strong>Skills:</strong>{' '}
                            <TypingEffect
                              text={mentor.skills && mentor.skills.length > 0 ? mentor.skills.join(', ') : "No Skills Available"}
                              speed={100}
                              delay={600}
                            />
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <ReactTypingEffect
                      text="Your mentor match will appear here."
                      speed={100}
                      eraseSpeed={100} 
                      typingDelay={200} 
                      eraseDelay={5000} 
                      displayTextRenderer={(text) => (
                        <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{text}</span>
                      )}
                    />
                  )}
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
