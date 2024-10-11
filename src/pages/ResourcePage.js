import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Paper, Button, Avatar, Tabs, Tab, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import './ResourcePage.css'; // Custom CSS file for styling

function ResourcePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const handleSendMessage = () => {
    const inputElement = document.getElementById('message-input');
    const newMessage = inputElement.value;
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { text: newMessage, type: 'user' },
        { text: 'this is interaction test', type: 'bot' }
      ]);
      inputElement.value = '';
    }
  };

  return (
    <div style={{ backgroundColor: '#2c2c2c', minHeight: '100vh', padding: '20px' }}>
      {/* Header Section */}
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
      <Container maxWidth="md" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Chat Box Section */}
        <Paper elevation={3} style={{ width: '100%', height: '500px', padding: '20px', backgroundColor: '#333333', color: '#ffffff', overflowY: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Chat Bot
          </Typography>
          <div id="chat-box" className="chat-box">
            {/* Render Messages */}
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}
                alignItems="center"
                style={{ marginBottom: '10px' }}
              >
                {message.type === 'bot' && (
                  <Avatar style={{ marginRight: '10px' }}>C</Avatar>
                )}
                <Paper
                  style={{
                    padding: '10px 15px',
                    borderRadius: '15px',
                    maxWidth: '70%',
                    backgroundColor: message.type === 'user' ? '#1976d2' : '#aaaaaa',
                    color: '#ffffff'
                  }}
                >
                  {message.text}
                </Paper>
                {message.type === 'user' && (
                  <Avatar src="/path/to/profile.jpg" alt="User Profile" style={{ marginLeft: '10px' }} />
                )}
              </Box>
            ))}
          </div>
        </Paper>

        {/* Input Bar Section */}
        <Box display="flex" width="100%" marginTop="20px">
          <TextField
            id="message-input"
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            InputProps={{ style: { color: '#ffffff' } }}
            InputLabelProps={{ style: { color: '#ffffff' } }}
            style={{ backgroundColor: '#444444', borderRadius: '8px' }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            style={{ marginLeft: '10px', backgroundColor: '#1976d2', color: '#ffffff' }}
          >
            Send
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default ResourcePage;
