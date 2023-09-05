const endpoint = 'http://localhost:3000/';
async function getAll(path) {
    const response = await fetch(`${endpoint}${path}`);
    return await response.json();
}
async function getOne(path, id) {
    const response = await fetch(`${endpoint}${path}/${id}`);
    return await response.json();
}
async function create(path, data) {
    const response = await fetch(`${endpoint}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}
async function update(path, id, data) {
    const response = await fetch(`${endpoint}${path}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}
async function destroy(path, id) {
    const response = await fetch(`${endpoint}${path}/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}
export { getAll, getOne, create, update, destroy };
