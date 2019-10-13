import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Textarea = ({
  name, value, placeholder, onChange, info, error,
  maxLength, required, styles,
}) => {
  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;

  return (
    <div className="form-input">
      <div className="title">{name}</div>
      <textarea type="text" name={name}
        id={name} className="text-input textarea"
        placeholder={newPlaceholder}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        style={styles}
        required={required}
      />
      {!error && <span className="info">{info}</span>}
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
  maxLength: PropTypes.number,
};

Textarea.defaultProps = {
  required: false,
};

export default Textarea;
