import { isEmpty } from 'lodash';

const validateCreateEventA = (values) => {
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


export {
  validateCreateEventA,
};
