import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Textbox = ({
  id, name, value, title, type, placeholder, onChange, info, error, required, styles,
}) => {
  const newPlaceholder = (required) ? `${placeholder} *` : placeholder;
  return (
    <div className="form-input">
					<div className="title">{title}</div>
					<input type={type} name={name}
						id={id} className="text-input" placeholder={newPlaceholder}
						onChange={onChange} value={value} style={styles}
					/>
          {!error && <span className="info">{info}</span>}
          {error && <span className="error" id={`${name}-error`}>{error}</span>}
				</div>
  );
};

// proptypes
Textbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default Textbox;
