import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './styles.scss';

const Fab = ({
  onClickFunction, styles, name, containerClassName,
  children,
}) => (
  <div className={`fab-container ${containerClassName}`} onClick={onClickFunction} style={styles}>
    {children}
    {!children
      && <FontAwesome
        key="plus"
        name={name}
        className="icon"
        size="2x"
      />
    }
  </div>
);

Fab.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node,
  name: PropTypes.string,
  onClickFunction: PropTypes.func,
  containerClassName: PropTypes.string,
};

Fab.defaultProps = {
  name: 'plus',
  containerClassName: '',
  children: null,
};

export default Fab;
