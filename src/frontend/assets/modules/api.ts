
const endpoint = 'http://localhost:3000/';

// CRUD operations for the API
async function getAll(path: string) {
  const response = await fetch(`${endpoint}${path}`);
  return await response.json();
}

async function getOne(path: string, id: string) {
    const response = await fetch(`${endpoint}${path}/${id}`);
    return await response.json();
}

async function create(path: string, data: Artist | Favorite) {
  const response = await fetch(`${endpoint}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function update(path: string, id: string, data: Artist | Favorite) {
    const response = await fetch(`${endpoint}${path}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function destroy(path: string, id: string) {
    const response = await fetch(`${endpoint}${path}/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

export { getAll, getOne, create, update, destroy };