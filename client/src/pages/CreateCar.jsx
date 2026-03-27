import React, { useState } from 'react';
import { createCar } from '../services/CarsAPI';
import { isValidCombination } from '../utilities/validation';
import { calculatePrice } from '../utilities/calcprice';
import '../App.css';

const initialState = {
    make: '',
    model: '',
    color: '',
    price: 0,
    features: {}
};

const CreateCar = () => {
    const [car, setCar] = useState(initialState);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setCar(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        // Example: features could be extended to a real form
        const features = {};
        if (!isValidCombination(features)) {
            setError('Invalid feature combination.');
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
        <div>
            <h2>Create a New Car</h2>
            <form onSubmit={handleSubmit}>
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
                {/* Add feature selectors here if needed */}
                <button type="submit" disabled={loading}>Create Car</button>
            </form>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default CreateCar;