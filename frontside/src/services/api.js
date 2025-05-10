import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 创建 axios 实例
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            // 处理token过期
            if (status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            // 统一错误提示
            const message = data.message || '请求失败';
            // 这里可以集成你的提示组件
            console.error(message);
        }
        return Promise.reject(error);
    }
);

// Auth 相关接口
export const authApi = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (data) => api.patch('/auth/profile', data)
};

// Product 相关接口
export const productApi = {
    getProducts: (params) => api.get('/products', { params }),
    getProduct: (id) => api.get(`/products/${id}`),
    createProduct: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'images') {
                data[key].forEach(image => {
                    formData.append('images', image);
                });
            } else if (key === 'specifications') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });
        return api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateProduct: (id, data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'images') {
                data[key].forEach(image => {
                    formData.append('images', image);
                });
            } else if (key === 'specifications') {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });
        return api.patch(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    deleteProduct: (id) => api.delete(`/products/${id}`)
};

export default api;
