import React, { useEffect, useState } from 'react';
import { getAllCustomItems, deleteCustomItem, createCustomItem, updateCustomItem } from '../services/CustomItemsAPI';

const FEATURE_TYPES = ['roofs', 'wheels', 'interiors', 'exteriors', 'convertible'];

const ManageCustomItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ itemname: '', catagory: FEATURE_TYPES[0], price: 0, image: '' });
  const [selectedType, setSelectedType] = useState(FEATURE_TYPES[0]);
  const [viewing, setViewing] = useState(null);
  const [search, setSearch] = useState('');

  const fetchItems = () => {
    setLoading(true);
    getAllCustomItems()
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this custom item?')) return;
    try {
      await deleteCustomItem(id);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm({
      itemname: item.itemname || '',
      catagory: item.catagory || selectedType,
      price: item.price || 0,
      image: item.image || ''
    });
  };

  const handleView = (item) => {
    setViewing(item);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateCustomItem(editing, form);
        setEditing(null);
      } else if (adding) {
        await createCustomItem(form);
        setAdding(false);
      }
      setForm({ itemname: '', catagory: selectedType, price: 0, image: '' });
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter items by selected type (catagory) and search by name
  const filteredItems = items
    .filter(item => (item.catagory || '').toLowerCase() === selectedType.toLowerCase())
    .filter(item => item.itemname.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', height: '80vh', background: '#222', color: 'white', borderRadius: 10, margin: '2rem auto', maxWidth: 900, minWidth: 320 }}>
      {/* Left Navigation */}
      <div style={{ width: 180, background: '#181818', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: '1.2rem 0.7rem', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
        <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem' }}>Features</h3>
        {FEATURE_TYPES.map(type => (
          <button
            key={type}
            onClick={() => { setSelectedType(type); setEditing(null); setViewing(null); setForm(f => ({ ...f, type })); }}
            style={{
              background: selectedType === type ? '#007bff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '0.45rem 0.5rem',
              fontWeight: 600,
              fontSize: '0.92rem',
              marginBottom: 3,
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: selectedType === type ? '2px solid #007bff' : 'none',
              minWidth: 0,
              width: '100%'
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      {/* Right Panel */}


      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h2 style={{ margin: 0 }}>Manage {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Items</h2>
          <button onClick={() => { setAdding(true); setForm({ itemname: '', catagory: selectedType, price: 0, image: '' }); }} style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 700, fontSize: '1rem', boxShadow: '0 2px 8px #000', cursor: 'pointer' }}>+ Add Item</button>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name..."
          style={{ marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff', fontSize: '1rem', width: '100%' }}
        />
        {loading ? <div>Loading...</div> : (
          <div style={{ width: '100%', background: '#222', borderRadius: 8, boxShadow: '0 2px 8px #000', padding: '0.5rem 0', maxHeight: 420, overflowY: 'auto' }}>
            {filteredItems.length === 0 ? (
              <div style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>No items found.</div>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {filteredItems.map(item => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '0.75rem 1rem' }}>
                    <a href="#" onClick={e => { e.preventDefault(); handleEdit(item); }} style={{ color: '#007bff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'underline', cursor: 'pointer' }}>{item.itemname}</a>
                    <span style={{ color: '#fff', fontWeight: 500 }}>${item.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {/* Add Modal */}
        {adding && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#222', color: 'white', borderRadius: 10, padding: 24, minWidth: 320, maxWidth: 370, boxShadow: '0 2px 16px #000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {form.image && (
                <img src={form.image} alt={form.itemname} style={{ maxWidth: 180, maxHeight: 100, borderRadius: 8, marginBottom: 12, background: '#111', objectFit: 'contain', boxShadow: '0 2px 8px #000' }} />
              )}
              <h3 style={{ marginBottom: 12 }}>Add New Item</h3>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
                <label style={{ fontWeight: 600, width: '100%' }}>Name
                  <input name="itemname" value={form.itemname} onChange={handleFormChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                </label>
                <label style={{ fontWeight: 600, width: '100%' }}>Price
                  <input name="price" type="number" value={form.price} onChange={handleFormChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                </label>
                <label style={{ fontWeight: 600, width: '100%' }}>Category
                  <select name="catagory" value={form.catagory} onChange={handleFormChange} style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }}>
                    {FEATURE_TYPES.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </label>
                <label style={{ fontWeight: 600, width: '100%' }}>Image URL
                  <input name="image" value={form.image || ''} onChange={handleFormChange} style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} placeholder="Paste image URL only" />
                </label>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8, width: '100%' }}>
                  <button type="submit" style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Add</button>
                  <button type="button" onClick={() => { setAdding(false); setForm({ itemname: '', catagory: selectedType, price: 0, image: '' }); }} style={{ background: '#888', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Edit Modal */}
        {editing && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#222', color: 'white', borderRadius: 10, padding: 24, minWidth: 320, maxWidth: 370, boxShadow: '0 2px 16px #000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Image preview always at the top */}
              {form.image && (
                <img src={form.image} alt={form.itemname} style={{ maxWidth: 180, maxHeight: 100, borderRadius: 8, marginBottom: 12, background: '#111', objectFit: 'contain', boxShadow: '0 2px 8px #000' }} />
              )}
              <h3 style={{ marginBottom: 12 }}>Edit Item</h3>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
                <label style={{ fontWeight: 600, width: '100%' }}>Name
                  <input name="itemname" value={form.itemname} onChange={handleFormChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                </label>
                <label style={{ fontWeight: 600, width: '100%' }}>Price
                  <input name="price" type="number" value={form.price} onChange={handleFormChange} required style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                </label>
                <label style={{ fontWeight: 600, width: '100%' }}>Image URL
                  <input name="image" value={form.image || ''} onChange={handleFormChange} style={{ width: '100%', marginTop: 4, marginBottom: 8, padding: 6, borderRadius: 4, border: '1px solid #444', background: '#181818', color: '#fff' }} />
                </label>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8, width: '100%' }}>
                  <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Save</button>
                  <button type="button" onClick={() => { setEditing(null); setForm({ itemname: '', catagory: selectedType, price: 0, image: '' }); }} style={{ background: '#888', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Cancel</button>
                  <button type="button" onClick={async () => { await handleDelete(editing); setEditing(null); }} style={{ background: '#d9534f', color: 'white', border: 'none', borderRadius: 4, padding: '0.65rem 0', fontWeight: 600, flex: 1 }}>Delete</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCustomItems;
