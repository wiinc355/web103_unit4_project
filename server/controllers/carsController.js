import { pool } from '../config/database.js';

// Get all cars
export async function getCars(req, res) {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a single car by id
export async function getCar(req, res) {
  try {
    const { id } = req.params;
    // Only proceed if id is a positive integer
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid car ID' });
    }
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create a new car
export async function createCar(req, res) {
  try {
    const { make, model, color, price, roof, wheels, exterior, interior, convertible, features } = req.body;
    const result = await pool.query(
      'INSERT INTO cars (make, model, color, price, roof, wheels, exterior, interior, convertible, features) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [make, model, color, price, roof, wheels, exterior, interior, convertible, features]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a car
export async function updateCar(req, res) {
  try {
    const { id } = req.params;
    const { make, model, color, price, roof, wheels, exterior, interior, convertible, features } = req.body;
    const result = await pool.query(
      'UPDATE cars SET make=$1, model=$2, color=$3, price=$4, roof=$5, wheels=$6, exterior=$7, interior=$8, convertible=$9, features=$10 WHERE id=$11 RETURNING *',
      [make, model, color, price, roof, wheels, exterior, interior, convertible, features, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a car
export async function deleteCar(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}