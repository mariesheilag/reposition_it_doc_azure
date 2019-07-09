import React, { useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import get from 'lodash/get';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { Layout } from '../components';
import axios from '../service/axios';

const cx = classnames.bind(styles);

const LoginContinue = ({ router }: any) => {
  useEffect(() => {
    continueLogin();
  });

  const continueLogin = async () => {
    try {
      await axios.post('/api/id/continue', { token: get(router, ['query', 'token']) });
      Router.replace({ pathname: '/dashboard' });
    } catch (err) {
      Router.replace({ pathname: '/', query: { display: 'failed' } });
    }
  };

  return (
    <Layout>
      <h3 className={cx('title')}>Redirecting...</h3>
    </Layout>
  );
};

export default withRouter(LoginContinue);
