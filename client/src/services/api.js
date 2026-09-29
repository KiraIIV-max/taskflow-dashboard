const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
};

const request = async (endpoint, options = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: { ...getHeaders(), ...options.headers },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        if (res.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
};

const api = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;