import axios from 'axios';
const baseUrl = '/api/users';

const getAllUserBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getUserBlogs = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

export default {
  getAllUserBlogs,
  getUserBlogs
}
