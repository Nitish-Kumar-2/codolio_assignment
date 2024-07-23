import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', 
  withCredentials: true,
});

export const apiConnector = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  bodyData?: any,
  headers?: any,
  params?: any
) => {
  try {
    console.log(bodyData)
    const response = await axiosInstance({
      method,
      url,
      data: bodyData ? bodyData : null,
      headers: headers ? headers : {},
      params: params ? params : null,
    });
    return response;
  } catch (error) {
    console.error('API Connector Error:', error);
    throw error;
  }
};