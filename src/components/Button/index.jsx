import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {
  const {
    title, handleClick, disabled,
    customStyles, buttonType,
  } = props;

  return (
    <div className="up-button">
				<button type={buttonType} className="button" style={customStyles}
          onClick={handleClick} disabled={disabled}
        >
          {title}
        </button>
    </div>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  handleClick: () => {},
  buttonType: 'submit',
  disabled: false,
};

export default Button;
