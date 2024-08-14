import axios from 'axios';
import React, { useState } from 'react';
import SimulateFreightOptions from './SimulateFreightOptions';

const SimulateFreightForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    originZipCode: '',
    destinationZipCode: '',
    height: 0,
    width: 0,
    length: 0,
  });

  const apiUrl = 'https://api-freight-simulator-b7aa6dc01480.herokuapp.com';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  const simulate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(`${apiUrl}/freight-simulation`, formValues);
      setData(response.data);
    } catch (error) {
      setError('Erro ao buscar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Simulador de Frete</h1>
      <form onSubmit={simulate}>
        <div>
          <label htmlFor='originZipCode'>CEP de origem</label>
          <input
            type='text' 
            id='originZipCode' 
            value={formValues.originZipCode} 
            onChange={handleInputChange} 
          />
        </div>

        <div>
          <label htmlFor='destinationZipCode'>CEP de destino</label>
          <input
            type='text' 
            id='destinationZipCode' 
            value={formValues.destinationZipCode} 
            onChange={handleInputChange} 
          />
        </div>

        <div>
          <label htmlFor='height'>Altura</label>
          <input
            type='number' 
            id='height' 
            value={formValues.height} 
            onChange={handleInputChange} 
          />
        </div>

        <div>
          <label htmlFor='width'>Largura</label>
          <input
            type='number' 
            id='width' 
            value={formValues.width} 
            onChange={handleInputChange} 
          />
        </div>

        <div>
          <label htmlFor='length'>Comprimento</label>
          <input
            type='number' 
            id='length' 
            value={formValues.length} 
            onChange={handleInputChange} 
          />
          
        </div>
        <button type='submit'>Calcular</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <SimulateFreightOptions freightOperatorOptions={data} />
    </div>
  );
};

export default SimulateFreightForm;
