import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Logo.scss';
import lang from '../../helpers/en.default';

const Logo = (props) => (
  <Link to={lang.layoutSideNav.home.link}
    className={`logo ${props.customClassName}`}
    style={props.customStyles}
  >
    {lang.appName}
  </Link>
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
