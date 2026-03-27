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
        <div>
            <h2>Edit Car</h2>
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
                {/* Add feature editors here if needed */}
                <button type="submit">Update Car</button>
            </form>
            {message && <div style={{ color: 'green' }}>{message}</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default EditCar;