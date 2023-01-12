import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { 'Authorization': 'token' }
});

export const loadUser = () => request.get('api/phonebooks')

export const addUser = (name, phone) => request.post('api/phonebooks', { name, phone })

export const updateUser = (id, name, phone) => request.put(`api/phonebooks/${id}`, { name, phone })

export const removeUser = (id) => request.delete(`api/phonebooks/${id}`)






