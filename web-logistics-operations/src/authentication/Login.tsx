import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { auth, GoogleAuthProvider, signInWithPopup } from './firebase';
import { updateAxiosHeaders } from '../axiosConfig'

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      const customerUid = user.uid;
      const token = await user.getIdToken();
  
      localStorage.setItem('x-customer-uid', customerUid);
      localStorage.setItem('authorization', token);

      updateAxiosHeaders();

      navigate('/simulate-freight');
    } catch (error) {
      console.error('Error on login:', error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        backgroundColor: '#f0f2f5',
        color: '#282c34',
        padding: '20px',
        borderRadius: '30px'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Bem vindo(a)!
      </Typography>
      <Button
        variant="contained"
        onClick={login}
        sx={{
          width: '100%',
          height: '50px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          backgroundColor: '#282c34',
          '&:hover': {
            backgroundColor: '#357ae8',
          },
        }}
      >
        <img
          src={window.location.origin + '/google-icon.png'}
          alt="Google Logo"
          style={{ width: '24px', height: '24px', marginRight: '10px' }}
        />
        <Typography variant="button" sx={{ fontWeight: 'bold', color: 'white' }}>
          Login com o Google
        </Typography>
      </Button>
    </Container>
  );
};

export default LoginPage;
