import React from 'react';

import styles from '@repositionit/ui/static/scss/app.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export interface IInput {
  disabled?: boolean;
  name: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  value: string;
}

export const Input = ({ disabled = false, name, onChange, placeholder, value }: IInput) => (
  <input
    id={name}
    className={cx('form-control')}
    disabled={disabled}
    name={name}
    onChange={onChange && onChange}
    placeholder={placeholder}
    value={value}
  />
);
