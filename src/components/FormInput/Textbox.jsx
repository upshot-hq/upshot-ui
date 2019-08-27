import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Textbox = ({
  id, name, value, title, type, placeholder, onChange, info, error, required,
}) => {
  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;
  return (
    <div className="form-input">
      {title && <div className="title">{title}</div>}
      <input type={type} name={name}
        id={id} className="text-input" placeholder={newPlaceholder}
        onChange={onChange} value={value}
      />
      {info && !error && <span className="info">{info}</span>}
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  );
};

// proptypes
Textbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Textbox;
