import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import get from 'lodash/get';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { FormItem, Layout } from '../components';
import axios from '../service/axios';
import { getLocalStorageItem } from '../utils/getters';
import { setLocalStorageItem } from '../utils/setters';

const cx = classnames.bind(styles);

interface IIndex {
  query: any;
}

const Index = ({ query }: IIndex) => {
  const [failure, setFailure] = useState(undefined);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    checkFingerprint();
  });

  const checkFingerprint = async () => {
    if (!getLocalStorageItem('fingerprint')) {
      const { data } = await axios.post('/api/id/fingerprint', {
        useragent: window.navigator.userAgent,
      });
      setLocalStorageItem('fingerprint', get(data, ['fingerprint']));
    }
  };

  const handleChange = (e: any): any => {
    e.preventDefault();
    const { name, value } = e.target || e.srcElement;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setPending(true);
      setFailure(undefined);
      await checkFingerprint();
      await axios.post('/api/id/login', { email: get(values, ['email']) });
      setValues({});
      setPending(false);
      Router.push({
        pathname: '/',
        query: { display: 'success' },
      });
    } catch (err) {
      setFailure(get(err, ['message'], 'Opps! Something went wrong.'));
      setPending(false);
    }
  };

  return (
    <Layout>
      <h3 className={cx('title')}>Login</h3>

      {get(query, ['display']) === 'success' ? (
        <p>Login request received. Please check your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormItem
            disabled={pending}
            name={'email'}
            onChange={handleChange}
            label={'Email'}
            value={get(values, ['email'], '')}
          />

          <button className={cx('btn', 'btn-primary')} disabled={pending} type="submit">
            SIGN IN
          </button>

          {failure && <p>{failure}</p>}
          {get(query, ['display']) === 'failed' && <p>Opps! Something went wrong.</p>}
        </form>
      )}

      <Link href="/sample" as="/sample">
        <a>Sample page</a>
      </Link>
    </Layout>
  );
};

Index.getInitialProps = ({ query }: IIndex) => ({ query });

export default Index;
