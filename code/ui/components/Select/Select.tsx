import React from 'react';
import get from 'lodash/get';

import styles from '@repositionit/ui/static/scss/app.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface Ioption {
  name: number | string;
  value: number | string;
}

export interface ISelect {
  disabled?: boolean;
  name: string;
  onChange?: (e: any) => void;
  options?: Ioption[];
  placeholder?: string;
  value: string;
}

export const Select = ({ disabled = false, name, onChange, options = [], placeholder, value }: ISelect) => (
  <select
    className={cx('form-control')}
    disabled={disabled}
    id={name}
    name={name}
    onChange={onChange && onChange}
    value={value}
  >
    {placeholder && (
      <option disabled value={''}>
        {placeholder}
      </option>
    )}
    {options &&
      options.map((option: any) => (
        <option key={get(option, ['value'])} value={get(option, ['value'])}>
          {get(option, ['name'])}
        </option>
      ))}
  </select>
);
