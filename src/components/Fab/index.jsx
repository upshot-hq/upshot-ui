import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import './styles.scss';

const Fab = ({ onClickFunction, styles, name }) => (
  <div className="fab-container" onClick={onClickFunction} style={styles}>
    <FontAwesome
            key="plus"
            name={name}
            size="2x"
            style={{ fontSize: '25px' }}
          />
  </div>
);

Fab.propTypes = {
  styles: PropTypes.object,
  name: PropTypes.string,
  onClickFunction: PropTypes.func,
};

Fab.defaultProps = {
  name: 'plus',
};

export default Fab;
