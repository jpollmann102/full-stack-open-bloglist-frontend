import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl);

  response.data.sort((a, b) => a.likes < b.likes ? 1 : a.likes === b.likes ? 0 : -1);

  return response.data;
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  return await axios.delete(`${baseUrl}/${id}`, config);
}

export default {
  getAll,
  createBlog,
  updateBlog,
  removeBlog,
  setToken
}
