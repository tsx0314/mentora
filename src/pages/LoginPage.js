import React from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';

const LoginPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Box 
                sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.9)', 
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3 
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Username" 
                        margin="normal" 
                        required 
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        margin="normal" 
                        required 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                    >
                        Log In
                    </Button>
                </form>
                <Link href="/signin" variant="body2" align="center" display="block" sx={{ marginTop: 2 }}>
                    Don't have an account? Sign up here.
                </Link>
            </Box>
        </Container>
    );
};

export default LoginPage;
