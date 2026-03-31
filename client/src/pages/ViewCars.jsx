
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>All Cars</h2>
            {cars.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, width: '100%', maxWidth: 500 }}>
                    {cars.map(car => (
                        <li key={car.id} style={{
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            borderRadius: '10px',
                            margin: '1rem 0',
                            padding: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>
                            <span>
                                <b>{car.make} {car.model}</b> - {car.color} - ${car.price}
                            </span>
                            <span style={{ display: 'inline-flex', gap: '0.25rem', marginLeft: '1rem' }}>
                                <button onClick={() => window.location.href = `/customcars/${car.id}`} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', marginRight: 4, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>View</button>
                                <button onClick={() => window.location.href = `/edit/${car.id}`} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', marginRight: 4, transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#0056b3'} onMouseOut={e => e.currentTarget.style.background = '#007bff'}>Edit</button>
                                   </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewCars;