import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${apiUrl}/api/persons`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
        .catch(error => {
            throw error;
        });
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
        .catch(error => {
            throw error;
        });
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
        .catch(error => {
            throw error;
        });
}

const deleteObject = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export default {
    getAll,
    create,
    update,
    deleteObject
}