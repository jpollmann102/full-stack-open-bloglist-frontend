import blogService from '../services/blogs';

const sortByLikes = (a, b) => {
  return a.likes < b.likes ? 1 : a.likes === b.likes ? 0 : -1
}

export const addLike = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog({...blog, likes: blog.likes + 1});
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    });
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id);
    dispatch({
      type: 'REMOVE_BLOG',
      id
    });
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    });
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAllBlogs();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    });
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case('LIKE_BLOG'):
      const blogToUpdate = state.find(b => b.id === action.data.id);

      if(blogToUpdate)
      {
        return state.map(a => a.id === action.data.id ? action.data : a).sort(sortByLikes);
      }else return state;
    case('CREATE_BLOG'):
      return state.concat(action.data).sort(sortByLikes);
    case('INITIALIZE_BLOGS'):
      return action.data.sort(sortByLikes);
    case('REMOVE_BLOG'):
      return state.filter(b => b.id !== action.id);
    default: return state;
  }
}

export default blogReducer
