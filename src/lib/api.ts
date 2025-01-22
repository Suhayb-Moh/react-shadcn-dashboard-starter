import axios from 'axios';
import API_BASE_URL from '../config.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// add interceptors to include the access token in the request
api.interceptors.request.use(async (config) => {
  try {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token'))
      ?.split('=')[1];
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
  return config;
});

// add interceptor to handle 401 unauthorized and redirect to login page
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token from the cookie
      document.cookie = 'token=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      // Redirect to login page
      window.location.href = '/login';
    } else if (error.response && error.response.status === 404) {
      // Handle 404 error
      console.log('Resource not found');
    }
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

// Helper function to handle API GET request
export async function getApiData<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T | null> {
  try {
    const res = await api.get<T>(endpoint, { params });
    return res.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API POST request
export async function postApiData<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await api.post<T>(endpoint, data);
    return res.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API UPDATE request
export async function updateApiData<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await api.patch<T>(endpoint, data);
    return res.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    return null;
  }
}

// Helper function to handle API DELETE request
export async function deleteApiData<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await api.delete<T>(endpoint);
    return res.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    return null;
  }
}

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
