import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar } from '../services/CarsAPI';
import { isValidCombination } from '../utilities/validation';
import { calculatePrice } from '../utilities/calcprice';
import '../App.css';

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getCar(id)
            .then(data => {
                setCar(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setCar(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!isValidCombination(car.features || {})) {
            setError('Invalid feature combination.');
            return;
        }
        const price = calculatePrice(Number(car.price), car.features || {});
        try {
            await updateCar(id, { ...car, price });
            setMessage('Car updated!');
            setTimeout(() => navigate(`/customcars/${id}`), 1000);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading car...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!car) return <div>Car not found.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Edit Car</h2>
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
                <label>
                    Make:
                    <input name="make" value={car.make} onChange={handleChange} required />
                </label>
                <label>
                    Model:
                    <input name="model" value={car.model} onChange={handleChange} required />
                </label>
                <label>
                    Color:
                    <input name="color" value={car.color} onChange={handleChange} required />
                </label>
                <label>
                    Base Price:
                    <input name="price" type="number" value={car.price} onChange={handleChange} required />
                </label>
                {/* Add feature editors here if needed */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="submit" style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>Update Car</button>
                  <button type="button" onClick={() => navigate('/customcars')} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>Cancel</button>
                </div>
            </form>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default EditCar;