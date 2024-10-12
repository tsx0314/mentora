import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const LoginPage = () => {
    const [email, setEmail] = useState('');  // State to store email input
    const [password, setPassword] = useState('');  // State to store password input
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
    const auth = getAuth();  // Get Firebase Auth instance
    const navigate = useNavigate();  // Initialize useNavigate hook for redirection

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //const user = userCredential.user;
                navigate('/matching');
            })
            .catch((error) => {
                const errorCode = error.code;
                let message = '';

                switch (errorCode) {
                    case 'auth/user-not-found':
                        message = 'Failed to Login: Invalid Username';
                        break;
                    case 'auth/wrong-password':
                        message = 'Failed to Login: Invalid Password';
                        break;
                    case 'auth/invalid-email':
                        message = 'Failed to Login: Invalid Email Format';
                        break;
                    case 'auth/user-disabled':
                        message = 'Failed to Login: User Account is Disabled';
                        break;
                    case 'auth/invalid-credential':
                        message = 'Failed to Login: Invalid Credential';
                        break;
                    default:
                        message = 'Failed to Login: An unexpected error occurred';
                        break;
                }

                setErrorMessage(message);
            });
    };

    useEffect(() => {
        // Set the background color of the body to dark blue (close to black)
        document.body.style.backgroundColor = '#0A0F1F';
    }, []);

    return (
        <Container 
            maxWidth="xs" 
            style={{ 
                marginTop: '100px', 
                padding: '20px',
                borderRadius: '8px',
                fontFamily: 'Myriad',
                fontWeight: 'bold',
            }}
        >
            <Box 
                sx={{ 
                    bgcolor: '#111c30',
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3,
                    border: '2px solid #61dafb',
                    fontFamily: 'Myriad',
                    fontWeight: 'bold',
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' }} // Set text color to white and font to Myriad
                >
                    Log In
                </Typography>
                {errorMessage && (
                    <Typography 
                        variant="body2" 
                        align="center" 
                        color="error" 
                        sx={{ mb: 2 }}
                    >
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Email" 
                        margin="normal" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' } // Change label color and font to bold
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' }, // Change input text color to white and make it bold
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' } // Change label color and font to bold
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' }, // Change input text color to white and make it bold
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
                            fontFamily: 'Myriad', // Set font family to Myriad
                            fontWeight: 'bold', // Make the button text bold
                            padding: '10px 30px',
                            borderRadius: '30px'
                        }} 
                        fullWidth 
                    >
                        Log In
                    </Button>
                </form>
                <Link 
                    href="/signup" 
                    variant="body2" 
                    align="center" 
                    display="block" 
                    sx={{ marginTop: 2, color: '#55c3e5', fontFamily: 'Myriad', fontWeight: 'bold' }} // Set link color and font to match
                >
                    Don't have an account? Sign up here.
                </Link>
            </Box>
        </Container>
    );
};

export default LoginPage;
