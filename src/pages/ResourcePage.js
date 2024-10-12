import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Tabs, Tab, Container, Paper, InputBase, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';

function ResourcePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, user: 'me' }]);
      setMessages([...messages, { text: inputMessage, user: 'me' }, { text: 'this is interaction test', user: 'bot' }]);
      setInputMessage('');
    }
  };

  return (
    <div style={{ backgroundColor: '#0A0F1F', minHeight: '100vh', fontFamily: 'Myriad' }}>
      {/* Header Section with Tabs */}
      <AppBar position="static" style={{ backgroundColor: '#161A2A' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {/* Logo Image */}
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
          {/* Profile Image */}
          <Avatar src={require('../user.png')} alt="Profile Picture" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
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
            Resources
          </Typography>
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '10px' }}>
            Use our chatbot below to ask questions or explore resources.
          </Typography>
        </Paper>

        {/* Chatbox Section */}
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            backgroundColor: '#111c30',
            color: '#ffffff',
            borderRadius: '10px',
            border: '2px solid #61dafb',
            height: 'calc(100vh - 300px)',  // Fixed height same as left and right boxes on the matching page
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.user === 'me' ? 'right' : 'left', margin: '10px 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    backgroundColor: message.user === 'me' ? '#61dafb' : '#333333',
                    color: '#ffffff',
                    borderRadius: '10px',
                    padding: '10px',
                    maxWidth: '80%',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <InputBase
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: '#333333',
                color: '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                marginRight: '10px',
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              style={{
                backgroundColor: '#61dafb',
                color: '#0A0F1F',
                fontFamily: 'Myriad',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '1rem',
              }}
            >
              Send
            </Button>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default ResourcePage;
