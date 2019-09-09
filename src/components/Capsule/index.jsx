import React from 'react';
import PropTypes from 'prop-types';

import './Capsule.scss';

const Capsule = ({
  title, handleClose, id, handleSelect,
  capsuleStyle, textStyle, closeBtnStyle,
  showCloseBtn,
}) => {
  const handleCloseBtnClick = () => {
    handleClose(id);
  };

  return (
    <div id={id} key={id} className="us-capsule" style={capsuleStyle}>
      <div className="us-capsule__text" onClick={handleSelect} style={textStyle}>
        {title}
      </div>
      {showCloseBtn
        && <span className="us-capsule__close-btn"
          onClick={handleCloseBtnClick} style={closeBtnStyle}>
          &times;
        </span>
      }
    </div>
  );
};

Capsule.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleSelect: PropTypes.func,
  closeBtnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  capsuleStyle: PropTypes.object,
  showCloseBtn: PropTypes.bool,
};

Capsule.defaultProps = {
  showCloseBtn: true,
};

export default Capsule;
