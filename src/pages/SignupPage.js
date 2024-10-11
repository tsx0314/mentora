import React, { useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const SignupPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle sign-up logic here
    };

    useEffect(() => {
        // Set the background color of the body to black
        document.body.style.backgroundColor = 'black';
    }, []);

    return (
        <Container 
            maxWidth="xs" 
            style={{ 
                marginTop: '100px', 
                padding: '20px', // Add some padding
                borderRadius: '8px' // Optional: add border radius for rounded corners
            }}
        >
            <Box 
                sx={{ 
                    bgcolor: 'black',
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3,
                    border: '2px solid #61dafb'
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'white' }} // Set text color to blue
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Username" 
                        margin="normal" 
                        required 
                        InputLabelProps={{ style: { color: 'white' } }} 
                        InputProps={{ 
                            style: { color: 'white' }, 
                            sx: { 
                                '& .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color to #61dafb
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color on hover to #61dafb
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color when focused to #61dafb
                                }
                            }
                        }} 
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        margin="normal" 
                        required 
                        InputLabelProps={{ style: { color: 'white' } }} 
                        InputProps={{ 
                            style: { color: 'white' }, 
                            sx: { 
                                '& .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color to #61dafb
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color on hover to #61dafb
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb' // Set border color when focused to #61dafb
                                }
                            }
                        }} 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#61dafb', // Set custom background color
                            '&:hover': {
                                backgroundColor: '#55c3e5' // Optional: change the hover color
                            }
                        }} 
                        fullWidth 
                    >
                        Sign Up
                    </Button>
                </form>
                <Link 
                    href="/signup" 
                    variant="body2" 
                    align="center" 
                    display="block" 
                    sx={{ marginTop: 2, color: '#55c3e5' }} // Set link color to blue
                >
                    Already have an account? Log in here.
                </Link>
            </Box>
        </Container>
    );
};

export default SignupPage;
