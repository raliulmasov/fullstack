import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getPersons = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const addPerson = async (newContact) => {
    const response = await axios.post(baseUrl, newContact);
    return response.data;
}

const deletePerson = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}

const updatePerson = async (id, updatedContact) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedContact);
    return response.data;
}

export { getPersons, addPerson, deletePerson, updatePerson };