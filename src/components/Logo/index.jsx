import React from 'react';
import PropTypes from 'prop-types';
import lang from '../../helpers/en.default';

import './Logo.scss';

const Logo = (props) => (
  <div className={`logo ${props.customClassName}`} style={props.customStyles}>
    {lang.appName}
  </div>
);

Logo.propTypes = {
  customStyles: PropTypes.object,
  customClassName: PropTypes.string,
};

Logo.defaultProps = {
  customStyles: {},
  customClassName: '',
};

export default Logo;
