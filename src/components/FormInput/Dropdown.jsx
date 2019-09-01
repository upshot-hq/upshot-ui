import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './styles.scss';

const Dropdown = ({
  name, value, placeholder, onChange, info,
  error, required, styles, options, disabled,
  optionsValueProperty, optionsTitleProperty,
}) => {
  const iconClassName = disabled ? 'chevy disabled' : 'chevy';

  return (
    <div className="us-drop-down">
      <select className="us-drop-down__select" required={required}
        onChange={onChange} name={name} value={value} style={styles}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map(
          (option, index) => (
            <option
              value={option[optionsValueProperty]}
              key={index}
            >
              {option[optionsTitleProperty]}
            </option>),
        )}
      </select>
      <span className={iconClassName}>
        <FontAwesome name="chevron-down" />
      </span>
      {!error && <span className="info">{info}</span>}
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  );
};


Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  optionsTitleProperty: PropTypes.string.isRequired,
  optionsValueProperty: PropTypes.string.isRequired,
};

Dropdown.defaultProps = {
  disabled: false,
};

export default Dropdown;
