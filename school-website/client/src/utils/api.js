import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach admin token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.msg ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const admissionAPI = {
  submit: (data) => API.post('/admissions', data),
  checkStatus: (appNo) => API.get(`/admissions/status/${appNo}`),
  getSeats: () => API.get('/admissions/seats'),
  updateStatus: (id, status) =>
    API.put(`/admissions/${id}/status`, { status }),
  // ✅ ADD THIS
  getAll: () => API.get('/admissions'),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
};

export const achieverAPI = {
  getAll: (params) => API.get('/achievers', { params }),
};

export const newsAPI = {
  getAll: (params) => API.get('/news', { params }),
  getOne: (slug) => API.get(`/news/${slug}`),
};

export const transportAPI = {
  getRoutes: () => API.get('/transport/routes'),
};

export const hostelAPI = {
  getInfo: () => API.get('/hostel/info'),
};

export const galleryAPI = {
  getAll: () => API.get('/gallery'),
};


export default API;
