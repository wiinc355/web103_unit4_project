const API_URL = '/api/customitems';

export async function getAllCustomItems() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch custom items');
  return res.json();
}

export async function getCustomItem(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch custom item');
  return res.json();
}

export async function createCustomItem(item) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create custom item');
  }
  return res.json();
}

export async function updateCustomItem(id, item) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to update custom item');
  }
  return res.json();
}

export async function deleteCustomItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete custom item');
  return true;
}
