import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/CarsAPI';
import { isValidCombination } from '../utilities/validation';
import { calculatePrice } from '../utilities/calcprice';
import '../App.css';


const initialState = {
  make: '',
  model: '',
  color: '',
  price: '',
};


function CreateCar() {
    const [car, setCar] = useState(initialState);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!isValidCombination(car.make, car.model, car.color)) {
            setError('Invalid car combination.');
            return;
        }
        const price = calculatePrice(Number(car.price), features);
        setLoading(true);
        try {
            await createCar({ ...car, price, features });
            setMessage('Car created!');
            setCar(initialState);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h2 style={{ textAlign: 'center', width: '100%' }}>Create a New Car</h2>
                <form onSubmit={handleSubmit} style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    borderRadius: '10px',
                    margin: '1rem 0',
                    padding: '1.5rem',
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    alignItems: 'center',
                }}>
                    <label style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Make:
                        <input name="make" value={car.make} onChange={handleChange} required style={{ width: '90%', margin: '0.25rem auto', textAlign: 'center' }} />
                    </label>
                    <label style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Model:
                        <input name="model" value={car.model} onChange={handleChange} required style={{ width: '90%', margin: '0.25rem auto', textAlign: 'center' }} />
                    </label>
                    <label style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Color:
                        <input name="color" value={car.color} onChange={handleChange} required style={{ width: '90%', margin: '0.25rem auto', textAlign: 'center' }} />
                    </label>
                    <label style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        Base Price:
                        <input name="price" type="number" value={car.price} onChange={handleChange} required style={{ width: '90%', margin: '0.25rem auto', textAlign: 'center' }} />
                    </label>
                    {/* Add feature selectors here if needed */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', width: '100%' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                minWidth: 80,
                                padding: '2px 16px',
                                fontSize: '0.9em',
                                fontFamily: 'inherit',
                                background: '#007bff',
                                color: 'white',
                                borderRadius: 4,
                                border: 'none',
                                cursor: 'pointer',
                                height: 36,
                                lineHeight: '32px',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                            onMouseOut={e => e.currentTarget.style.background = '#007bff'}
                        >
                            Update Car
                        </button>
                        <button type="button" onClick={() => navigate('/customcars')} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>Cancel</button>
                    </div>
                </form>
                {message && <div style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>{message}</div>}
                {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</div>}
            </div>
        </div>
    );
}

export default CreateCar;