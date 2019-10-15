import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import './styles.scss';

const Fab = ({
  onClickFunction, styles, name, containerClassName,
}) => (
  <div className={`fab-container ${containerClassName}`} onClick={onClickFunction} style={styles}>
    <FontAwesome
      key="plus"
      name={name}
      className="icon"
      size="2x"
    />
  </div>
);

Fab.propTypes = {
  styles: PropTypes.object,
  name: PropTypes.string,
  onClickFunction: PropTypes.func,
  containerClassName: PropTypes.string,
};

Fab.defaultProps = {
  name: 'plus',
  containerClassName: '',
};

export default Fab;
