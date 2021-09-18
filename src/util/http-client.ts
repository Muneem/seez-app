import axios, { AxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'text/plain',
  },
});

export const axiosRequest = async (options: AxiosRequestConfig) => {
  return axiosClient(options);
};
