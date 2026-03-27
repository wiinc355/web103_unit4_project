import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCar, deleteCar } from '../services/CarsAPI';
import '../App.css';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;
        try {
            await deleteCar(id);
            navigate('/customcars');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading car details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!car) return <div>Car not found.</div>;

    return (
        <div>
            <h2>Car Details</h2>
            <p><b>Make:</b> {car.make}</p>
            <p><b>Model:</b> {car.model}</p>
            <p><b>Color:</b> {car.color}</p>
            <p><b>Price:</b> ${car.price}</p>
            <p><b>Features:</b> {car.features ? JSON.stringify(car.features) : 'None'}</p>
            <Link to={`/edit/${car.id}`}>Edit</Link>
            {' '}<button onClick={handleDelete}>Delete</button>
            {' '}<Link to="/customcars">Back to Cars</Link>
        </div>
    );
};

export default CarDetails;