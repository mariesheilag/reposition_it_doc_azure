import React, { useEffect } from 'react';
import Router from 'next/router';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { Layout } from '../components';
import axios from '../service/axios';

const cx = classnames.bind(styles);

const Dashboard = () => {
  useEffect(() => {
    getDummyData();
  });

  const getDummyData = async () => {
    try {
      await axios.get('/api/id/protected');
    } catch (err) {
      if (`${err.response.status}` === '401') {
        Router.push({ pathname: '/', query: { display: 'failed' } });
      }
    }
  };

  return (
    <Layout>
      <h3 className={cx('title')}>Dashboard</h3>
    </Layout>
  );
};

export default Dashboard;
