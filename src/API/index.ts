import axios, { CreateAxiosDefaults } from 'axios';

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const httpClient = axios.create(axiosConfig);
