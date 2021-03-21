import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

const blog = {
  author: "Test Author",
  likes: 0,
  title: "A test note",
  url: "testurl.com"
};

const createBlog = jest.fn();
const changeTitle = jest.fn();
const changeAuthor = jest.fn();
const changeUrl = jest.fn();

describe('<BlogForm />', () => {
  let component;
  let input;
  let form;

  beforeEach(() => {
    component = render(
      <BlogForm
        onSubmit={ createBlog }
        handleTitleChange = { changeTitle }
        handleAuthorChange = { changeAuthor }
        handleUrlChange = { changeUrl }
        titleValue = { blog.title }
        authorValue = { blog.author }
        urlValue = { blog.url }
      />
    );
    // input = screen.getByRole('input', { name: 'author' });
    input = component.container.querySelector('input');
    form = component.container.querySelector('form');
  });

  test('updates parent state and calls onSubmit', () => {
    fireEvent.change(input, {
      target: { value: blog.author }
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].content).toBe(blog.author);
    // expect(input).toHaveValue(blog.author);
  });
});
