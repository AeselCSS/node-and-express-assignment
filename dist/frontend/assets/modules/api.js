const url = 'http://localhost:3000/';
async function getAll(path) {
    const response = await fetch(`${url}${path}`);
    return await response.json();
}
async function getOne(path, id) {
    const response = await fetch(`${url}${path}/${id}`);
    return await response.json();
}
async function create(path, data) {
    const response = await fetch(`${url}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (response.status !== 201) {
        console.log(response.status);
        throw new Error(`Error creating ${path}`);
    }
    return await response.json();
}
async function update(path, id, data) {
    const response = await fetch(`${url}${path}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (response.status !== 200) {
        throw new Error(`Error updating ${path}`);
    }
    return await response.json();
}
async function destroy(path, id) {
    const response = await fetch(`${url}${path}/${id}`, {
        method: 'DELETE',
    });
    if (response.status !== 200) {
        throw new Error(`Error deleting ${path}`);
    }
    return await response.json();
}
export { getAll, getOne, create, update, destroy };
