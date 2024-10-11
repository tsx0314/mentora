import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SignupPage = () => {
    const [email, setEmail] = useState('');  // State to store email input
    const [password, setPassword] = useState('');  // State to store password input
    const [confirmPassword, setConfirmPassword] = useState(''); // State to store confirm password input
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
    const auth = getAuth();  // Get Firebase Auth instance
    const navigate = useNavigate();  // Initialize useNavigate hook for redirection

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful signup, redirect to login or another page
                navigate('/matching'); // Redirect to matching page (or any page you prefer)
            })
            .catch((error) => {
                // Handle errors and display meaningful messages
                const errorCode = error.code;
                let message = '';

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        message = 'Email already in use.';
                        break;
                    case 'auth/invalid-email':
                        message = 'Invalid email format.';
                        break;
                    case 'auth/weak-password':
                        message = 'Password should be at least 6 characters.';
                        break;
                    default:
                        message = 'Failed to sign up. Please try again.';
                        break;
                }

                console.error(errorCode, error.message);
                setErrorMessage(message);  // Set the error message in state
            });
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
                borderRadius: '8px', // Optional: add border radius for rounded corners
                fontFamily: 'Roboto',// Set the font family to fantasy
                fontWeight: 'bold', // Make the font bold
            }}
        >
            <Box 
                sx={{ 
                    bgcolor: 'black',
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3,
                    border: '2px solid #61dafb',
                    fontFamily: 'Roboto',// Set the font family to fantasy
                    fontWeight: 'bold', // Make the font bold
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }} // Set text color to white and font to fantasy
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Email" 
                        margin="normal" 
                        required 
                        value={email}  // Bind value to email state
                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                        InputLabelProps={{ 
                            style: { color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' } // Change label color and font to bold
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }, // Change input text color to white and make it bold
                            sx: { 
                                '& .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
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
                        InputLabelProps={{ 
                            style: { color: 'white', fontFamily: 'Roboto',fontWeight: 'bold' } // Change label color and font to bold
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }, // Change input text color to white and make it bold
                            sx: { 
                                '& .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                                    borderColor: '#61dafb'
                                }
                            }
                        }} 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#61dafb',
                            '&:hover': {
                                backgroundColor: '#55c3e5'
                            },
                            fontFamily: 'Roboto', // Set font family to fantasy
                            fontWeight: 'bold' // Make the button text bold
                        }} 
                        fullWidth 
                    >
                        Sign Up
                    </Button>
                </form>
                <Link 
                    href="/login" 
                    variant="body2" 
                    align="center" 
                    display="block" 
                    sx={{ marginTop: 2, color: '#55c3e5', fontFamily: 'Roboto', fontWeight: 'bold' }} // Set link color to blue and font to fantasy
                >
                    Already have an account? Log in here.
                </Link>
            </Box>
        </Container>
    );
};

export default SignupPage;
