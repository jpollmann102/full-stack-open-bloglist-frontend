import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;
  let button;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='create'>
        <div className="testDiv">
          test content
        </div>
      </Togglable>
    );
    button = component.container.querySelector('button');
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.testDiv');
    expect(div).toBeNull();
  });

  test('after clicking the button, children are displayed', () => {
    fireEvent.click(button);

    const div = component.container.querySelector('.testDiv');
    expect(div).not.toBeNull();
    expect(div).toHaveTextContent('test content');
  });

  test('toggled content can be closed', () => {
    fireEvent.click(button);
    fireEvent.click(button);

    const div = component.container.querySelector('.testDiv');
    expect(div).toBeNull();
  });
});
