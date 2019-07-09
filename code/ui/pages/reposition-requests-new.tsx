import React, { useState } from 'react';
import Router from 'next/router';
import get from 'lodash/get';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { FormItem, Layout } from '../components';
import axios from '../service/axios';

const cx = classnames.bind(styles);

const RepositionRequestsNew = ({ terminals }: any) => {
  const [failure, setFailure] = useState(undefined);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({});

  // TODO: handleBlur

  const handleChange = (e: any): any => {
    e.preventDefault();
    const { name, value } = e.target || e.srcElement;
    setValues({
      ...values,
      [name]: value,
    });
    // TODO: validate
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setPending(true);
      setFailure(undefined);
      const { data } = await axios.post('/api/booking/reposition-requests', {
        fromType: 'terminals',
        fromId: get(values, ['origin']),
        toType: 'terminals',
        toId: get(values, ['destination']),
        equipmentType: 'twenty',
        whitelistedProviders: [1, 2, 3, 4, 5],
        departureDateStart: get(values, ['from']),
        departureDateEnd: get(values, ['to']),
      });
      // setValues({});
      // setPending(false);
      Router.push({
        pathname: `/reposition-requests/${data.rid}`,
      });
    } catch (err) {
      setFailure(get(err, ['message'], 'Opps! Something went wrong.'));
      setPending(false);
    }
  };

  return (
    <Layout>
      <h3 className={cx('title')}>New Reposition Request</h3>

      <form onSubmit={handleSubmit}>
        <FormItem
          disabled={pending}
          label={'Origin'}
          name={'origin'}
          onChange={handleChange}
          options={terminals}
          placeholder={'Please select a Terminal'}
          type={'select'}
          value={get(values, ['origin'], '')}
        />

        <FormItem
          disabled={pending}
          label={'Destination'}
          name={'destination'}
          onChange={handleChange}
          options={terminals}
          placeholder={'Please select a Terminal'}
          type={'select'}
          value={get(values, ['destination'], '')}
        />

        <FormItem
          disabled={pending}
          label={'From'}
          name={'from'}
          onChange={handleChange}
          // TODO: onChangeFormat (date)
          placeholder={'Select a Date'}
          value={get(values, ['from'], '')}
        />

        <FormItem
          disabled={pending}
          label={'To'}
          name={'to'}
          onChange={handleChange}
          placeholder={'Select a Date'}
          value={get(values, ['to'], '')}
        />

        <button className={cx('btn', 'btn-primary')} disabled={pending} type="submit">
          Create Request
        </button>
        {failure && <p>{failure}</p>}
      </form>
    </Layout>
  );
};

RepositionRequestsNew.getInitialProps = () => {
  return {
    terminals: [
      { name: 'Bukai', value: '14' },
      { name: 'Pacific Container Terminal', value: '1' },
      { name: 'SSA T-30', value: '22' },
    ],
  };
};

export default RepositionRequestsNew;
