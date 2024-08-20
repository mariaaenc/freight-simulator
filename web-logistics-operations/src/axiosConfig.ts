import axios from 'axios';

export const updateAxiosHeaders = () => {
  const customerUid = localStorage.getItem('x-customer-uid');
  const tokenId = localStorage.getItem('authorization');

  axios.defaults.headers.common['x-customer-uid'] = customerUid || '';
  axios.defaults.headers.common['authorization'] = tokenId || '';
};
