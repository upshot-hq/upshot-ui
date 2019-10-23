import { isEmpty } from 'lodash';
import moment from 'moment';

const validateGettingStarted = (values) => {
  const errors = {};
  // hashtag cannot be empty
  if (!values.hashtag || (values.hashtag && !values.hashtag.trim())) {
    errors.hashtag = 'hashtag cannot be empty';
  }

  // hashtag must start with #
  if ((values.hashtag && values.hashtag.trim()) && !values.hashtag.startsWith('#')) {
    errors.hashtag = 'hashtag must begin with "#"';
  }

  // hashtag must have no space
  const regex = /\s/;
  if (!errors.hashtag && regex.test(values.hashtag.trim())) {
    errors.hashtag = 'hashtag cannot contain spaces';
  }

  // hashtag cannot be more that 20 characters
  if ((values.hashtag && values.hashtag.trim()) && values.hashtag.trim().length > 20) {
    errors.hashtag = 'hashtag cannot have more than 10 characters';
  }

  // ensure at least one competition is selected
  if (!values.competitions.length) {
    errors.competitions = 'atleast one competition must be selected';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

const validateAlmostThere = (values) => {
  const errors = {};

  if (!values.name || (values.name && !values.name.trim())) {
    errors.name = 'event name cannot be empty';
  }

  if ((values.name && values.name.trim()) && values.name.trim().length > 50) {
    errors.name = 'event name cannot have more than 50 characters';
  }

  if (!values.aboutText || (values.aboutText && !values.aboutText.trim())) {
    errors.about = 'about cannot be empty';
  }

  if ((values.aboutText && values.aboutText.trim()) && values.aboutText.trim().length > 200) {
    errors.about = 'about cannot have more than 200 characters';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

const validateLastThing = (values) => {
  const errors = {};

  if (!values.startDate) {
    errors.startDate = 'start date cannot be empty';
  }

  if (!values.endDate) {
    errors.endDate = 'end date cannot be empty';
  }

  // start date must not be in the past
  if (values.startDate && (moment(values.startDate).isBefore(moment(), 'day'))) {
    errors.startDate = 'start date cannot be in the past';
  }

  const startDate = new Date(values.startDate).getTime();
  const endDate = new Date(values.endDate).getTime();
  const minuteDifference = (endDate - startDate) / 60000;
  const noOfMinutesToCompare = 30;

  // end date must be atleast 30mins ahead of the start date
  if (values.endDate && minuteDifference < noOfMinutesToCompare) {
    errors.endDate = `end date must be atleast 
    ${noOfMinutesToCompare} minutes ahead of the start date`;
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};


export {
  validateGettingStarted,
  validateAlmostThere,
  validateLastThing,
};
