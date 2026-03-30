import { pool } from '../config/database.js';

// Get all custom items
export async function getCustomItems(req, res) {
  try {
    const result = await pool.query('SELECT * FROM customitems');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a single custom item by id
export async function getCustomItem(req, res) {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }
    const result = await pool.query('SELECT * FROM customitems WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create a new custom item
export async function createCustomItem(req, res) {
  try {
    const { itemname, image, catagory, price } = req.body;
    const result = await pool.query(
      'INSERT INTO customitems (itemname, image, catagory, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [itemname, image, catagory, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a custom item
export async function updateCustomItem(req, res) {
  try {
    const { id } = req.params;
    const { itemname, image, catagory, price } = req.body;
    const result = await pool.query(
      'UPDATE customitems SET itemname=$1, image=$2, catagory=$3, price=$4 WHERE id=$5 RETURNING *',
      [itemname, image, catagory, price, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a custom item
export async function deleteCustomItem(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM customitems WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
