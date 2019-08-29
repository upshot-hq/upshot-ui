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

  // hashtag cannot be more that 10 characters
  if ((values.hashtag && values.hashtag.trim()) && values.hashtag.trim().length > 10) {
    errors.hashtag = 'hashtag cannot have more than 10 characters';
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

  if (!values.about || (values.about && !values.about.trim())) {
    errors.about = 'about cannot be empty';
  }

  if ((values.about && values.about.trim()) && values.about.trim().length > 200) {
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

  // start date must be ahead of today
  if (values.startDate && (moment(values.startDate).isSameOrBefore(moment(), 'day'))) {
    errors.startDate = 'start date must be after today';
  }

  // end date must be ahead of today
  if (values.endDate && (moment(values.endDate).isSameOrBefore(moment(), 'day'))) {
    errors.endDate = 'end date must be after today';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
}


export {
  validateGettingStarted,
  validateAlmostThere,
  validateLastThing,
};
