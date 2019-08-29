import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

const Loader = (props) => {
  const { customStyles } = props;

  return (
    <div className="up-loader" style={customStyles} />
  );
};

Loader.propTypes = {
  customStyles: PropTypes.object,
};

Loader.defaultProps = {
  customStyles: {},
};

export default Loader;
