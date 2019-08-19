import React from 'react';
import PropTypes from 'prop-types';

import './Logo.scss';

const Logo = (props) => (
		<div className="logo" style={props.customStyles}>
				Upshot
		</div>
);

Logo.propTypes = {
  customStyles: PropTypes.object,
};

Logo.defaultProps = {
  customStyles: {},
};

export default Logo;
