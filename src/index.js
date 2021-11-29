import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries.js';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  if (!input.value.trim('')) {
    return;
  }

  fetchCountries
    .fetchCountries(input.value.trim(''))
    .then(userInputData)
    .catch(error => {
      console.log(error);
    });
}

function userInputData(countries) {
  countriesInfo();

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length >= 2 && countries.length < 10) {
    countries
      .map(country => {
        countriesRender(country);
      })
      .join();
  }
  if (countries.length === 1) {
    countries
      .map(country => {
        countryRender(country);
      })
      .join();
  }
}

function countriesRender({ name, flags }) {
  countryList.insertAdjacentHTML(
    'beforeend',
    `<li class ="list">
    <h2><img class = "flag" src="${flags.svg}">
     <span class="data">${name.official}</span></h2>
    </li>`,
  );
}

function countryRender({ name, capital, population, languages, flags }) {
  countryInfo.insertAdjacentHTML(
    'beforeend',
    `<ul>
            <li class ="list">
            <h2><img class = "flag" src="${flags.svg}">
             <span class="data name">${name.official}</span></h2>
            </li>
            <li class = "list">
                <h2>Capital: <span class="data">${capital}</span></h2>
            </li>
            <li class = "list">
                <h2>Population: <span class="data">${population}</span></h2>
            </li>
            <li class = "list">
               <h2>Languages: <span class="data">${Object.values(languages)}</span></h2>
            </li>
         </ul>`,
  );
}
function countriesInfo() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
