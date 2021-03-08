import axios from 'redaxios';
import api_key from './api_key';

const Http = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
  params: {
    api_key,
  },
});

const fetcher = url => Http.get(url).then(res => res.data);

export default fetcher;
