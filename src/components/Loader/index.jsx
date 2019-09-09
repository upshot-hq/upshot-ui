import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = (props) => {
  const { customStyles, message, containerClassName } = props;

  return (
    <div className={`up-loader-container ${containerClassName}`}>
      <div className="up-loader" style={customStyles} />
      {message && <span className="message">{message}</span>}
    </div>
  );
};

Loader.propTypes = {
  customStyles: PropTypes.object,
  containerClassName: PropTypes.string,
  message: PropTypes.string,
};

Loader.defaultProps = {
  customStyles: {},
};

export default Loader;
