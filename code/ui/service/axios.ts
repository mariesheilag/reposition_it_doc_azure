import axios from 'axios';
import { getLocalStorageItem } from '../utils/getters';

const fingerprint = getLocalStorageItem('fingerprint');

const fingerprintObj = fingerprint === undefined ? {} : { fingerprint: `${fingerprint}` };

export default axios.create({
  baseURL: process.env.PROXY_URL,
  headers: { ...fingerprintObj },
});
