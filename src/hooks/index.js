import { useState } from 'react';

export const useField = (type, name) => {
  const [ value, setValue ] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const reset = () => {
    setValue('');
  }

  return {
    type,
    name,
    value,
    onChange,
    reset
  }
}

export const useResettableField = (type, name) => {
  const field = useField(type, name);

  return {
    field: {
      type,
      name,
      value: field.value,
      onChange: field.onChange
    },
    reset: field.reset
  }
}
