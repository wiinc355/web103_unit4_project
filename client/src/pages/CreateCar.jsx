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


function CreateCar({ inModal = false, onCreated, onCancel }) {
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
            const createdCar = await createCar({ ...car, price, features });
            setMessage('Car created!');
            setCar(initialState);
            if (onCreated) onCreated(createdCar);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: inModal ? '100%' : '100vw',
            height: inModal ? 'auto' : '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)',
            color: 'white',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginLeft: 0,
                marginTop: 0,
            }}>
                <h2 style={{ textAlign: 'left', width: '100%', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Create a New Car</h2>
                <form onSubmit={handleSubmit} style={{
                    background: 'rgba(0,0,0,0.35)',
                    color: 'white',
                    borderRadius: '10px',
                    margin: '1rem 0',
                    padding: '1rem',
                    width: '100%',
                    maxWidth: 340,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    alignItems: 'stretch',
                    fontSize: '0.9rem',
                }}>
                    <label style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        Make:
                        <input name="make" value={car.make} onChange={handleChange} required style={{ width: '92%', margin: '0.2rem 0', textAlign: 'left', color: 'white', background: '#1d1d1d', border: '1px solid #555', fontSize: '0.88rem', padding: '0.35rem 0.5rem' }} />
                    </label>
                    <label style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        Model:
                        <input name="model" value={car.model} onChange={handleChange} required style={{ width: '92%', margin: '0.2rem 0', textAlign: 'left', color: 'white', background: '#1d1d1d', border: '1px solid #555', fontSize: '0.88rem', padding: '0.35rem 0.5rem' }} />
                    </label>
                    <label style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        Color:
                        <select name="color" value={car.color} onChange={handleChange} required style={{ width: '92%', margin: '0.2rem 0', textAlign: 'left', color: 'white', background: '#1d1d1d', border: '1px solid #555', fontSize: '0.88rem', padding: '0.35rem 0.5rem' }}>
                            <option value="" disabled>Select a color</option>
                            <option value="yellow">Yellow</option>
                            <option value="red">Red</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="blue">Blue</option>
                            <option value="gray">Gray</option>
                        </select>
                    </label>
                    <label style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        Base Price:
                        <input name="price" type="number" value={car.price} onChange={handleChange} required style={{ width: '92%', margin: '0.2rem 0', textAlign: 'left', color: 'white', background: '#1d1d1d', border: '1px solid #555', fontSize: '0.88rem', padding: '0.35rem 0.5rem' }} />
                    </label>
                    {/* Add feature selectors here if needed */}
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', width: '100%' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                minWidth: 72,
                                padding: '1px 10px',
                                fontSize: '0.74em',
                                fontFamily: 'inherit',
                                background: '#007bff',
                                color: 'white',
                                borderRadius: 4,
                                border: 'none',
                                cursor: 'pointer',
                                height: 30,
                                lineHeight: '26px',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#0056b3'}
                            onMouseOut={e => e.currentTarget.style.background = '#007bff'}
                        >
                            Create Car
                        </button>
                        <button type="button" onClick={() => (onCancel ? onCancel() : navigate('/customcars'))} style={{ minWidth: 72, padding: '1px 10px', fontSize: '0.74em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 30, lineHeight: '26px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>Cancel</button>
                    </div>
                </form>
                {message && <div style={{ color: 'green', textAlign: 'center', marginTop: '1rem' }}>{message}</div>}
                {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</div>}
            </div>
        </div>
    );
}

export default CreateCar;