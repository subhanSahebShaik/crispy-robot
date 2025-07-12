import axios from 'axios';

// Set your base URL once here
const BASE_URL = 'http://localhost:8000';

// GET all data
export const fetchIngestionData = () => {
    return axios.get(`${BASE_URL}/data/`);
};

// POST to create a new node
export const createNode = (nodeName) => {
    return axios.post(`${BASE_URL}/create-node/`, { name: nodeName });
};

// POST to create a new relation
export const createRelation = (relationData) => {
    return axios.post(`${BASE_URL}/create-relation/`, {
        from: relationData.from,
        to: relationData.to,
        type: relationData.type,
    });
};


// GET Gherkin output
export const fetchGherkinOutput = () => {
    return axios.get(`${BASE_URL}/generate-gherkin/`);
};