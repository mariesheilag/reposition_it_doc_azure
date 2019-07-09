import React from 'react';
import Link from 'next/link';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';

const cx = classnames.bind(styles);

export const Navbar = () => (
  <nav className={cx('navbar', 'navbar-expand', 'navbar-dark', 'bg-primary')}>
    <Link as="/" href="/">
      <a className={cx('navbar-brand')}>Reposition IT</a>
    </Link>

    {/* TODO: fix navbar-toggler navbar-expand-sm */}
    {/* <button
      className={cx('navbar-toggler')}
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className={cx('navbar-toggler-icon')}></span>
    </button> */}

    <div className={cx('collapse', 'navbar-collapse')} id={'navbarSupportedContent'}>
      <ul className={cx('navbar-nav')}>
        <li className={cx('nav-item')}>
          <Link as="/reposition-requests/new" href="/reposition-requests-new">
            <a className={cx('nav-link')}>New Request</a>
          </Link>
        </li>
        <li className={cx('nav-item')}>
          <Link as="/slot-offers/new" href="/slot-offers-new">
            <a className={cx('nav-link')}>New Offer</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);
