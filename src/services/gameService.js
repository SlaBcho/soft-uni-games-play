const baseUrl = 'http://localhost:3030';

export const getAll = () => {
    return fetch(`${baseUrl}/data/games?sortBy=_createdOn%20desc`)
    .then(res=> res.json());
};