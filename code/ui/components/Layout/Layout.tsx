import React from 'react';

import classnames from 'classnames/bind';
import styles from '@repositionit/ui/static/scss/app.scss';
import { Navbar } from '../Navbar';

const cx = classnames.bind(styles);

export interface ILayout {
  children?: any;
}

export const Layout = ({ children }: ILayout) => (
  <>
    <Navbar />
    <div className={cx('container')}>{children}</div>
  </>
);
