import React, { useState } from 'react';
import Router from 'next/router';
import addMonths from 'date-fns/addMonths';
import parse from 'date-fns/parse';
import get from 'lodash/get';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { FormItem, Layout } from '../components';
import axios from '../service/axios';

const cx = classnames.bind(styles);

const SlotOffersNew = ({ terminals }: any) => {
  const [failure, setFailure] = useState(undefined);
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({});

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
      const { data } = await axios.post('/api/booking/slot-offers', {
        terminalFrom: get(values, ['origin']),
        terminalTo: get(values, ['destination']),
        priceUnit: 250,
        quantityTwentyOriginal: 300,
        quantityFortyOriginal: 0,
        whitelistedClients: [6, 7],
        departureDateStart: get(values, ['from']),
        departureDateEnd: get(values, ['to']),
        arrivalDateStart: addMonths(parse(get(values, ['to']), 'yyyy-MM-dd', new Date()), 6),
        arrivalDateEnd: addMonths(parse(get(values, ['to']), 'yyyy-MM-dd', new Date()), 7),
      });
      // setValues({});
      // setPending(false);
      Router.push({
        pathname: `/slot-offers/${data.rid}`,
      });
    } catch (err) {
      setFailure(get(err, ['message'], 'Opps! Something went wrong.'));
      setPending(false);
    }
  };

  return (
    <Layout>
      <h3 className={cx('title')}>New Slot Offer</h3>

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
          Create Offer
        </button>
        {failure && <p>{failure}</p>}
      </form>
    </Layout>
  );
};

SlotOffersNew.getInitialProps = () => {
  return {
    terminals: [
      { name: 'Bukai', value: '14' },
      { name: 'Pacific Container Terminal', value: '1' },
      { name: 'SSA T-30', value: '22' },
    ],
  };
};

export default SlotOffersNew;
