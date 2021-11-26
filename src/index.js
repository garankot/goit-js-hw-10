import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './js/fetchCountries.js';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(Event, DEBOUNCE_DELAY));
