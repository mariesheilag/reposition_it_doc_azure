import React from 'react';
import axios from '../service/axios';
import styles from '@repositionit/ui/static/scss/app.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const Index = (props: any) => (
  <div>
    <div className={cx('container')}>
      <h1>THIS IS A SAMPLE</h1>
      <p className={cx('small', 'scoped')}>{props.data}</p>
      {props.query && props.query.sampleData && (
        <p>
          SSR'd: {props.query.sampleData}, coming from <code>Handler.SampleHandler</code>
        </p>
      )}
    </div>
  </div>
);

Index.getInitialProps = async ({ query }: any) => {
  const res = await axios.get('/api/.well-known/healthy');
  const data = await res.data;
  return {
    query,
    data,
  };
};

export default Index;
