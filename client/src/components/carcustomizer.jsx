import { useState, useEffect } from 'react'
import Navigation from './Navigation';
import backgroundImg from '../assets/background.jpg';
import { getCarsFeatureImages } from '../utilities/carsFeatureImages';
import { createCar, getAllCars, updateCar } from '../services/CarsAPI'
import CreateCar from '../pages/CreateCar'
import CarPreview from './carpreview'
import { calculatePrice } from '../utilities/calcprice'
import { validateCar } from '../utilities/validation'
import { getAllCustomItems } from '../services/CustomItemsAPI'

function CarCustomizer({ onCarCreated }) {
  // Car list state
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [carsLoading, setCarsLoading] = useState(true);
  const [carsError, setCarsError] = useState(null);
  const [editModalCar, setEditModalCar] = useState(null);
  const [editModalForm, setEditModalForm] = useState(null);
  const [editModalError, setEditModalError] = useState('');
  const [car, setCar] = useState({
    make: 'Toyota',
    model: 'Camry',
    year: 2025,
    roof: '',
    exterior: '',
    wheels: '',
    interior: '',
    convertible: '',
    price: 0
  })
  const [options, setOptions] = useState({
    roof: [],
    wheels: [],
    exterior: [],
    interior: [],
    convertible: []
  });
  const [carsFeatureImages, setCarsFeatureImages] = useState({});
  // Fetch options and cars
  useEffect(() => {
    async function fetchOptionsAndCars() {
      try {
        const items = await getAllCustomItems();
        // Group options by catagory
        const grouped = { roof: [], wheels: [], exterior: [], interior: [], convertible: [] };
        items.forEach(item => {
          // Normalize catagory to match keys, but keep 'wheels' as is
          let key = item.catagory?.toLowerCase();
          if (key) {
            if (key !== 'wheels' && key.endsWith('s')) key = key.slice(0, -1); // 'roofs' -> 'roof', etc., but keep 'wheels'
            if (grouped[key]) grouped[key].push(item);
          }
        });
        setOptions(grouped);
        // Set defaults if not already set
        setCar(prev => ({
          ...prev,
          roof: grouped.roof[0]?.itemname || '',
          wheels: grouped.wheels[0]?.itemname || '',
          exterior: grouped.exterior[0]?.itemname || '',
          interior: grouped.interior[0]?.itemname || '',
          convertible: grouped.convertible[0]?.itemname || ''
        }));
      } catch (err) {
        // Optionally handle error
      }
      // Fetch cars
      setCarsLoading(true);
      try {
        const carList = await getAllCars();
        setCars(carList);
        // Fetch feature images for all cars
        const images = await getCarsFeatureImages(carList);
        setCarsFeatureImages(images);
        setCarsLoading(false);
      } catch (err) {
        setCarsError(err.message);
        setCarsLoading(false);
      }
    }
    fetchOptionsAndCars();
  }, []);

  // Refresh cars list
  const refreshCars = async () => {
    setCarsLoading(true);
    try {
      const carList = await getAllCars();
      setCars(carList);
      // Update feature images after car list changes
      const images = await getCarsFeatureImages(carList);
      setCarsFeatureImages(images);
      setCarsLoading(false);
    } catch (err) {
      setCarsError(err.message);
      setCarsLoading(false);
    }
  };

  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    const updatedCar = { ...car, [field]: value };
    updatedCar.price = calculatePrice(
      updatedCar.exterior,
      updatedCar.wheels,
      updatedCar.interior,
      updatedCar.roof,
      updatedCar.convertible,
      options
    );
    setCar(updatedCar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const validationError = validateCar(car)
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      const newCar = await createCar(car)
      onCarCreated(newCar)
    } catch (err) {
      setError(err.message)
    }
  }

  // Modal handlers
  const openEditModal = (car) => {
    setEditModalCar(car);
    setEditModalForm({ ...car });
    setEditModalError('');
  };

  // Add Car modal handler
  const [addModalOpen, setAddModalOpen] = useState(false);
  const openAddCarModal = () => {
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const closeEditModal = () => {
    setEditModalCar(null);
    setEditModalForm(null);
    setEditModalError('');
  };
  const handleEditModalChange = (field, value) => {
    setEditModalForm(f => {
      const updated = { ...f, [field]: value };
      updated.price = calculatePrice(
        updated.exterior,
        updated.wheels,
        updated.interior,
        updated.roof,
        updated.convertible,
        options
      );
      return updated;
    });
  };
  const handleEditModalSave = async (e) => {
    e.preventDefault();
    setEditModalError('');
    try {
      // Optionally recalculate price if needed
      const updated = { ...editModalForm };
      updated.price = calculatePrice(
        updated.exterior,
        updated.wheels,
        updated.interior,
        updated.roof,
        updated.convertible,
        options
      );
      await updateCar(editModalCar.id, updated);
      await refreshCars();
      closeEditModal();
    } catch (err) {
      setEditModalError(err.message);
    }
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: `#222 url(${backgroundImg}) center center/cover no-repeat`,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      {/* Car List Section */}
      <div style={{ background: 'rgba(0,0,0,0.10)', padding: '1.5rem 2rem 1rem 2rem', borderBottom: '1px solid #444', alignSelf: 'center', width: '100%', maxWidth: 1400 }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.3rem', marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center' }}>CUSTOMIZE CARS</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginBottom: 12,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 520,
          maxWidth: '100%'
        }}>
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0 12px',
              borderRadius: 6,
              border: '1px solid #555',
              background: '#f8f3f3',
              color: 'black',
              fontSize: '1rem',
              outline: 'none',
              width: 400,
              height: 44,
              boxSizing: 'border-box',
              display: 'block',
            }}
          />
          <button
            onClick={() => setSearch('')}
            style={{
              marginLeft: 4,
              background: '#eee',
              color: '#222',
              border: '1px solid #bbb',
              borderRadius: 6,
              padding: '0 16px',
              height: 38,
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            disabled={!search}
            title="Clear search"
          >
            Clear
          </button>
          <button
            onClick={openAddCarModal}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '0 18px',
              minWidth: 96,
              height: 44,
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
            title="Add car"
          >
            Add Car
          </button>
        </div>
        <div style={{ color: '#ffc107', fontSize: '1rem', marginBottom: 10, textAlign: 'center' }}>
          Note: To modify and add features, click on the car name link.
        </div>
        {carsLoading ? <div>Loading cars...</div> : carsError ? <div style={{ color: 'red' }}>{carsError}</div> : (
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <table style={{ minWidth: 820, maxWidth: 1200, width: '100%', margin: '0 auto', color: 'white', background: 'rgba(30,30,30,0.35)', borderCollapse: 'separate', borderSpacing: 0, borderRadius: 16, marginTop: 24, overflow: 'hidden', tableLayout: 'auto', border: 'none', boxShadow: 'none' }}>
              <thead>
                <tr style={{ borderBottom: 'none', background: 'transparent' }}>
                  <th style={{ textAlign: 'left', padding: '16px 8px', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, width: '32%', minWidth: 180 }}>Name</th>
                  <th style={{ textAlign: 'center', padding: '16px 8px', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, width: '18%', minWidth: 130 }}>Price</th>
                  <th style={{ textAlign: 'center', padding: '16px 8px', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, width: '50%', minWidth: 320 }}>Features</th>
                </tr>
              </thead>
              <tbody>
                {cars
                  .filter(car =>
                    !search ||
                    (car.make && car.make.toLowerCase().includes(search.toLowerCase())) ||
                    (car.model && car.model.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map(car => (
                    <tr key={car.id} style={{ borderBottom: 'none', background: 'transparent', transition: 'background 0.2s' }}>
                      <td style={{ padding: '18px 8px', textAlign: 'left', fontWeight: 600, fontSize: '1.08rem', whiteSpace: 'normal', wordBreak: 'break-word', minWidth: 120, maxWidth: 700 }}>
                        <a href="#" style={{ color: '#4af', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700, fontSize: '1.08rem', whiteSpace: 'normal', wordBreak: 'break-word', display: 'block', minWidth: 0, width: '100%', maxWidth: 700 }} onClick={e => { e.preventDefault(); openEditModal(car); }}>{car.make} {car.model}</a>
                      </td>
                      <td style={{ padding: '18px 8px', textAlign: 'center', fontWeight: 600, fontSize: '1.08rem' }}>${car.price}</td>
                      <td style={{ padding: '18px 8px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
                          {['roof', 'wheels', 'exterior', 'interior', 'convertible'].map(type => {
                            const img = carsFeatureImages[car.id]?.[type];
                            const featureName = car[type];
                            const shouldRender = type === 'convertible'
                              ? featureName !== null && featureName !== undefined && String(featureName).trim() !== '' && !['false', '0', 'no', 'none'].includes(String(featureName).toLowerCase())
                              : Boolean(featureName);
                            return shouldRender ? (
                              <span key={type} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                                {img ? (
                                  <img src={img} alt={type} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10, border: '2px solid #444', background: '#222', boxShadow: '0 1px 6px #0006', flexShrink: 0 }} />
                                ) : (
                                  <span style={{ width: 56, height: 56, borderRadius: 10, border: '2px solid #444', background: '#1b1b1b', boxShadow: '0 1px 6px #0006', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', color: '#aaa', textTransform: 'uppercase' }}>
                                    {type}
                                  </span>
                                )}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Add Car Modal */}
        {addModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
            <div style={{ background: 'rgba(0,0,0,0.25)', color: 'white', borderRadius: 16, padding: '1.25rem 1.5rem', width: 520, boxShadow: '0 4px 32px #000', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              <CreateCar
                inModal={true}
                onCreated={async () => {
                  await refreshCars();
                  closeAddModal();
                }}
                onCancel={closeAddModal}
              />
            </div>
          </div>
        )}
   
      </div>
            {/* Edit Modal */}
      {editModalCar && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: '#222', color: 'white', borderRadius: 16, padding: 0, width: 'min(96vw, 1040px)', height: 'min(88vh, 760px)', boxShadow: '0 4px 32px #000', display: 'flex', flexDirection: 'row', alignItems: 'stretch', overflow: 'hidden' }}>
            {/* Left Side: Car Name + Nav */}
            <div style={{ width: 260, background: '#181818', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: '1.5rem 1.4rem', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'stretch' }}>
              <div style={{ marginBottom: 8, textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', letterSpacing: 0.5, color: '#fff', textShadow: '0 1px 4px #000' }}>
                {editModalCar.make} {editModalCar.model}
              </div>
              <div style={{ marginBottom: 16, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#4af' }}>
                ${editModalForm.price}
              </div>
              {['roof', 'wheels', 'exterior', 'interior', 'convertible'].map(type => (
                <button
                  key={type}
                  onClick={() => setEditModalForm(f => ({ ...f, __featureType: type }))}
                  style={{
                    background: (editModalForm.__featureType || 'roof') === type ? '#007bff' : '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0.52rem 0.45rem',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    marginBottom: 3,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    outline: (editModalForm.__featureType || 'roof') === type ? '2px solid #007bff' : 'none',
                    minWidth: 0,
                    width: '100%'
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setEditModalForm(f => {
                  const reset = {
                    ...f,
                    roof: '',
                    wheels: '',
                    exterior: '',
                    interior: '',
                    convertible: false,
                  };
                  reset.price = calculatePrice('', '', '', '', false, options);
                  return reset;
                })}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  padding: '0.52rem 0.45rem',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  marginTop: 16,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Reset Features
              </button>
            </div>
            {/* Right: Vertical List of Image Buttons */}
            <div style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0, alignItems: 'center', justifyContent: 'flex-start' }}>
              <h3 style={{ margin: 0, marginBottom: 16, fontWeight: 700, fontSize: '1.15rem' }}>Select {((editModalForm.__featureType || 'roof').charAt(0).toUpperCase() + (editModalForm.__featureType || 'roof').slice(1))}</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
                gap: 14,
                width: '100%',
                maxHeight: 'calc(88vh - 230px)',
                overflowY: 'auto',
                marginBottom: 16,
                alignItems: 'center',
                justifyItems: 'center',
                padding: '10px',
              }}>
                {(options[editModalForm.__featureType || 'roof'] || []).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleEditModalChange(editModalForm.__featureType || 'roof', opt.itemname)}
                    style={{
                      background: opt.image ? `url(${opt.image}) center/cover no-repeat` : '#181818',
                      border: (editModalForm[editModalForm.__featureType || 'roof'] === opt.itemname) ? '3px solid #007bff' : '2px solid #444',
                      borderRadius: 12,
                      width: 145,
                      height: 145,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: '0 1px 6px #0006',
                      margin: 0,
                      padding: 0,
                      overflow: 'hidden',
                      transition: 'border 0.2s',
                    }}
                  >
                    <span style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.55)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.82em',
                      borderRadius: 8,
                      padding: '0.35em 0.55em',
                      zIndex: 2,
                      textShadow: '0 1px 4px #000',
                      minWidth: 0,
                    }}>
                      <span style={{ fontSize: '0.84em', fontWeight: 600 }}>{opt.itemname}</span>
                      <span style={{ fontSize: '0.75em', fontWeight: 400, marginTop: 2 }}>${opt.price}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8, width: '100%' }}>
                <button type="button" onClick={handleEditModalSave} style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Save</button>
                <button type="button" onClick={closeEditModal} style={{ background: '#888', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Cancel</button>
              </div>
              {editModalError && <div style={{ color: 'red', marginTop: 8 }}>{editModalError}</div>}
            </div>
          </div>
        </div>
      )}
 
    </div>
  )
}

export default CarCustomizer