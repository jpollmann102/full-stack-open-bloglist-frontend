import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
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

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  return await axios.delete(`${baseUrl}/${id}`, config);
}

export default {
  getAllBlogs,
  getBlog,
  createComment,
  createBlog,
  updateBlog,
  removeBlog,
  setToken
}
