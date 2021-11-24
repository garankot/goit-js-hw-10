import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries.js'
const debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;
