
import React, { useEffect, useState } from 'react';
import { getAllCars, deleteCar } from '../services/CarsAPI';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchCars = () => {
        setLoading(true);
        getAllCars()
            .then(data => {
                setCars(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;
        try {
            await deleteCar(id);
            fetchCars();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading cars...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>All Cars</h2>
            {cars.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                <ul>
                    {cars.map(car => (
                        <li key={car.id}>
                            <b>{car.make} {car.model}</b> - {car.color} - ${car.price}
                            {' '}<Link to={`/customcars/${car.id}`}>View</Link>
                            {' '}<Link to={`/edit/${car.id}`}>Edit</Link>
                            {' '}<button onClick={() => handleDelete(car.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewCars;