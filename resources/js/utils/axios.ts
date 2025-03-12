import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
axios.defaults.headers.common['Accept'] = 'application/json';

