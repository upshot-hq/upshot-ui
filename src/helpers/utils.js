import jwtDecode from 'jwt-decode';
import bcrypt from 'bcryptjs';
import { createBrowserHistory } from 'history';

import {
  jwtKey, hashTagPrefix, handlePrefix, saltRounds,
} from './defaults';
import lang from './en.default';

export const isExpired = (expiredTimeInSec) => {
  const now = new Date();
  const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
  return nowInSec > expiredTimeInSec;
};

export const getUserDetails = (tokn) => {
  const token = tokn || localStorage.getItem(jwtKey);
  const userData = token ? jwtDecode(token) : null;
  const isAuthenticated = !!(userData && !isExpired(userData.exp));

  if (tokn && isAuthenticated) {
    localStorage.setItem(jwtKey, tokn);
  }

  const data = {
    isAuthenticated,
    userData,
  };

  return data;
};

export const apiErrorHandler = (error) => {
  let errorMessage;
  let validationErrors;
  // if server gets an error response, handle it
  if (error.response) {
    /**
     * using a switch statement instead of if/else because there is
     * a chance that we have to handle other error codes when we make
     * requests like GET to the server
     */
    switch (error.response.status) {
      case 500:
        errorMessage = lang.serverErrorMessage;
        break;
      case 422:
        validationErrors = error.response.data.errors
          .map((err) => err.msg || err.message)
          .join(', ');
        errorMessage = `${validationErrors}`;
        break;
      case 400:
        errorMessage = error.response.data.message || error.response.statusText;
        break;
      default:
        errorMessage = error.response.data.error || error.response.data.message;
    }
  } else {
    //  if server is down, client won't get a response
    errorMessage = lang.networkErrorMessage;
  }
  return errorMessage;
};

export const history = createBrowserHistory();

export const addStylesToHashTags = (text) => {
  const textArray = text.split(' ');

  const updatedText = textArray.map((word) => {
    if (word.startsWith(hashTagPrefix) || word.startsWith(handlePrefix)) {
      const newWord = `<span class="hashtag">${word}</span>`;
      return newWord;
    }

    return word;
  });

  return updatedText.join(' ');
};

export const hashData = async (data) => {
  const hashedData = await bcrypt.hash(data, saltRounds);
  return hashedData;
};

export const createFormData = (data) => {
  const formData = new FormData(); // eslint-disable-line
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
};
