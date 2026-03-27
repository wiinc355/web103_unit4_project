const API_URL = '/api/cars';

export async function getAllCars() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
}

export async function getCar(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch car');
  return res.json();
}

export async function createCar(car) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  });
  if (!res.ok) throw new Error('Failed to create car');
  return res.json();
}

export async function updateCar(id, car) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  });
  if (!res.ok) throw new Error('Failed to update car');
  return res.json();
}

export async function deleteCar(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete car');
  return res.json();
}
