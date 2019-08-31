import React from 'react';
import PropTypes from 'prop-types';

import './Capsule.scss';

const Capsule = ({
  title, handleClose, id, key, handleSelect,
  capsuleStyle, textStyle, closeBtnStyle,
}) => (
    <div id={id} key={key} className="us-capsule" style={capsuleStyle}>
      <div className="us-capsule__text" onClick={handleSelect} style={textStyle}>
        {title}
      </div>
      <span className="us-capsule__close-btn" onClick={handleClose} style={closeBtnStyle}>
        &times;
      </span>
    </div>
);

Capsule.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string,
  handleSelect: PropTypes.func,
  key: PropTypes.string,
  closeBtnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  capsuleStyle: PropTypes.object,
};

export default Capsule;
