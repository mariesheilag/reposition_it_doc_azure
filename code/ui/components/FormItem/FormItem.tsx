import React from 'react';

import styles from '@repositionit/ui/static/scss/app.scss';
import classnames from 'classnames/bind';
import { Input, IInput } from '../Input';
import { Select, ISelect } from '../Select';

const cx = classnames.bind(styles);

interface IFormItem extends IInput, ISelect {
  error?: string;
  label?: string;
  type?: 'select';
}

const render = ({ disabled = false, name, onChange, options, placeholder, type, value }: any) => {
  switch (type) {
    case 'select':
      return (
        <Select
          disabled={disabled}
          name={name}
          onChange={onChange && onChange}
          options={options}
          placeholder={placeholder}
          value={value}
        />
      );
    default:
      return (
        <Input
          disabled={disabled}
          name={name}
          onChange={onChange && onChange}
          placeholder={placeholder}
          value={value}
        />
      );
  }
};

export const FormItem = ({ disabled = false, error, label, name, onChange, options, placeholder, type, value }: IFormItem) => (
  <div className={cx('form-group')}>
    <div>
      <label htmlFor={name}>{label}</label>
    </div>
    <div>
      {render({
        disabled,
        name,
        onChange,
        options,
        placeholder,
        type,
        value,
      })}
    </div>
    {error && <p>{error}</p>}
  </div>
);
