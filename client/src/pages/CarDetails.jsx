import React, { useEffect, useState } from 'react';
import { getFeatureImages } from '../utilities/featureImages';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCar, deleteCar } from '../services/CarsAPI';
import '../App.css';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [featureImages, setFeatureImages] = useState({});

    useEffect(() => {
        getCar(id)
            .then(async data => {
                setCar(data);
                // Fetch feature images
                const images = await getFeatureImages(data);
                setFeatureImages(images);
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Car Details</h2>
                <div style={{
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
                    <div>
                        <strong>Make:</strong> {car.make}
                    </div>
                    <div>
                        <strong>Model:</strong> {car.model}
                    </div>
                    <div>
                        <strong>Color:</strong> {car.color}
                    </div>
                    <div>
                        <strong>Base Price:</strong> ${car.price}
                    </div>
                                        <div>
                                                <strong>Features:</strong> {car.features ? JSON.stringify(car.features) : 'None'}
                                        </div>
                                        {/* Show feature images */}
                                        {Object.keys(featureImages).length > 0 && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <strong>Feature Images:</strong>
                                                                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                                                                                                        {Object.entries(featureImages).map(([type, feat]) => (
                                                                                                                feat.image ? (
                                                                                                                    <img key={type} src={feat.image} alt={feat.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #444', background: '#222' }} />
                                                                                                                ) : null
                                                                                                        ))}
                                                                                                </div>
                                            </div>
                                        )}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                                      <Link to={`/edit/${car.id}`} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px' }}>Edit</Link>
                                      <button onClick={handleDelete} style={{ minWidth: 80, padding: '2px 16px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 36, lineHeight: '32px' }}>Delete</button>
                                      <Link to="/customcars" style={{ padding: '2px 24px', fontSize: '0.9em', fontFamily: 'inherit', background: '#007bff', color: 'white', borderRadius: 4, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', height: 36, lineHeight: '32px', whiteSpace: 'nowrap' }}>Back to Cars</Link>
                                </div>
                </div>
        </div>
    );
};

export default CarDetails;