import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom'; 

const SignupPage = () => {
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const auth = getAuth();  
    const navigate = useNavigate();  

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccessMessage('Account created successfully! Logging in...');
                signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setTimeout(() => {
                        navigate('/matching');
                    }, 2000);
                })
            })
            .catch((error) => {
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
                setErrorMessage(message);  
            });
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#0A0F1F';
    }, []);

    return (
        <Container 
            maxWidth="xs" 
            style={{ 
                marginTop: '100px', 
                padding: '20px',
                borderRadius: '8px',
                fontFamily: 'Myriad',  // Changed to Myriad
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
                    fontFamily: 'Myriad',  // Changed to Myriad
                    fontWeight: 'bold',
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' }} // Changed to Myriad
                >
                    Sign Up
                </Typography>
                {errorMessage && (
                    <Typography 
                        variant="body2" 
                        align="center" 
                        color="error" 
                        sx={{ 
                            mb: 2, 
                            fontFamily: 'Myriad',  // Changed to Myriad
                            fontWeight: 'bold' 
                        }}
                    >
                        {errorMessage}
                    </Typography>
                )}
                {successMessage && (
                    <Typography 
                        variant="body2" 
                        align="center" 
                        sx={{ 
                            mb: 2, 
                            fontFamily: 'Myriad',  // Changed to Myriad
                            fontWeight: 'bold',
                            color: 'lightgreen'  
                        }}
                    >
                        {successMessage}
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
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' } 
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' },
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
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' } 
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' },
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
                        label="Confirm Password" 
                        type="password" 
                        margin="normal" 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}  
                        InputLabelProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' } 
                        }} 
                        InputProps={{ 
                            style: { color: 'white', fontFamily: 'Myriad', fontWeight: 'bold' },
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
                            fontFamily: 'Myriad',  // Changed to Myriad
                            fontWeight: 'bold',
                            padding: '10px 30px',
                            borderRadius: '30px'
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
                    sx={{ marginTop: 2, color: '#55c3e5', fontFamily: 'Myriad', fontWeight: 'bold' }} // Changed to Myriad
                >
                    Already have an account? Log in here.
                </Link>
            </Box>
        </Container>
    ); 
};

export default SignupPage;
