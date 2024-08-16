import axios from 'axios';
import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import SimulateFreightOptions from './SimulateFreightOptions';
import { useAuth } from '../authentication/AuthContext';
import './SimulateFreight.css'

const SimulateFreightForm: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    originZipCode: '',
    destinationZipCode: '',
    height: '',
    width: '',
    length: '',
  });

  // const apiUrl = 'https://api-freight-simulator-b7aa6dc01480.herokuapp.com';
  const apiUrl = 'http://localhost:8000';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const isFormValid = () => {
    return Object.values(formValues).every(value => value.trim() !== '');
  };

  const simulate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(`${apiUrl}/freight-simulation`, {
        customerId: user?.uid,
        originZipCode: formValues.originZipCode,
        destinationZipCode: formValues.destinationZipCode,
        height: Number(formValues.height),
        width: Number(formValues.width),
        length: Number(formValues.length),
      });
      setData(response.data);
    } catch (error) {
      setError('Ocorreu um erro ao realizar a simulação, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Simulador de Frete</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          padding: '36px',
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
        noValidate
        autoComplete="off"
        onSubmit={simulate}
      >
        <div>
          <TextField
            required
            label='CEP de origem'
            id='originZipCode' 
            value={formValues.originZipCode} 
            onChange={handleInputChange} 
          />

          <TextField
            required
            label='CEP de destino'
            id='destinationZipCode' 
            value={formValues.destinationZipCode} 
            onChange={handleInputChange} 
          />
        </div>        
        <div>
          <TextField
            required
            label='Altura'
            id='height' 
            value={formValues.height} 
            onChange={handleInputChange} 
          />

          <TextField
            required
            label='Largura'
            id='width' 
            value={formValues.width} 
            onChange={handleInputChange} 
          />

          <TextField
            required
            label='Comprimento'
            id='length' 
            value={formValues.length} 
            onChange={handleInputChange} 
          />
        </div>
        <Button 
          className='Calculate-button' 
          variant="contained" 
          type='submit'
          disabled={!isFormValid()}
        >
          Calcular
        </Button>
      </Box>

      {loading && <p>Loading...</p>}
      {error && <Alert severity="error">{error}</Alert>}
      <SimulateFreightOptions freightOperatorOptions={data} />
    </div>
  );
};

export default SimulateFreightForm;
