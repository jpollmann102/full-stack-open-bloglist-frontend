import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  author: "Test Author",
  likes: 0,
  title: "A test note",
  url: "testurl.com",
  user: {
    username: "test_user",
    name: "Test Author"
  }
};

describe('<Blog />', () => {
  let component;
  let div;

  beforeEach(() => {
    component = render(
      <Blog blog={ blog } />
    );
    div = component.container.querySelector('.blog');
  });

  test('renders content', () => {
    expect(div).toHaveTextContent(
      'A test note'
    );
  });

  test('clicking view shows the rest of the blog', () => {
    expect(div).not.toHaveTextContent('testurl.com');

    const button = component.getByText('view');
    fireEvent.click(button);

    div = component.container.querySelector('.blog');
    
    expect(div).toHaveTextContent('testurl.com');
    expect(button).toHaveTextContent('hide');
  });

  test('clicking hide hides the rest of the blog', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    fireEvent.click(button);

    div = component.container.querySelector('.blog');

    expect(div).not.toHaveTextContent('testurl.com');
    expect(button).toHaveTextContent('view');
  });
});
