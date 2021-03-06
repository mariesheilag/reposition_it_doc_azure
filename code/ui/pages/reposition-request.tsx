import React from 'react';
import get from 'lodash/get';
import filter from 'lodash/filter';
import classnames from 'classnames/bind';

import styles from '@repositionit/ui/static/scss/app.scss';
import { Layout } from '../components';
import axios from '../service/axios';
import { formatDate } from '../utils/formatters';

const cx = classnames.bind(styles);

// TODO: Join Terminal in DB
const terminals = [
  { name: 'Bukai', value: '14' },
  { name: 'Pacific Container Terminal', value: '1' },
  { name: 'SSA T-30', value: '22' },
];

const RepositionRequest = ({ offers, request }: any) => (
  <Layout>
    <h3 className={cx('title')}>Repositioning Request Details</h3>
    <table className={cx('table')}>
      <thead className={cx('thead-light')}>
        <tr>
          <th scope="col">From terminal</th>
          <th scope="col">To terminal</th>
          <th scope="col">Pick Up date range</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{get(filter(terminals, { value: request.fromId })[0], ['name'], '')}</td>
          <td>{get(filter(terminals, { value: request.toId })[0], ['name'], '')}</td>
          <td>
            {formatDate(request.departureDateStart)} - {formatDate(request.departureDateEnd)}
          </td>
        </tr>
      </tbody>
    </table>
    {offers && offers.length > 0 && (
      <>
        <h3 className={cx('title')}>Matching Offers ({offers.length})</h3>
        <table className={cx('table')}>
          <thead className={cx('thead-light')}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Departure date range</th>
              <th scope="col">Arrival date range</th>
              <th scope="col">Price (per TEU)</th>
              <th scope="col">Slots available</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer: any, index: number) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {formatDate(offer.departureDateStart)} - {formatDate(offer.departureDateEnd)}
                </td>
                <td>
                  {formatDate(offer.arrivalDateStart)} - {formatDate(offer.arrivalDateEnd)}
                </td>
                <td>{offer.priceUnit}</td>
                <td>{offer.quantityTwentyOriginal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
    {offers && offers.length === 0 && <h3 className={cx('title')}>No matching offers found</h3>}
  </Layout>
);

RepositionRequest.getInitialProps = async ({ query }: any) => {
  const { data } = await axios.get(`/api/booking/match/reposition-request/${query.id}`);
  return data;
};

export default RepositionRequest;
