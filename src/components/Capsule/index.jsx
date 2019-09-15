import React from 'react';
import PropTypes from 'prop-types';

import './Capsule.scss';

const Capsule = ({
  title, handleClose, id, handleSelect,
  capsuleStyle, textStyle, closeBtnStyle,
  showCloseBtn, textClassName, capsuleClassName,
  btnClassName,
}) => {
  const handleCloseBtnClick = () => {
    handleClose(id);
  };

  return (
    <div id={id} key={id} className={`us-capsule ${capsuleClassName}`} style={capsuleStyle}>
      <div className={`us-capsule__text ${textClassName}`} onClick={handleSelect} style={textStyle}>
        {title}
      </div>
      {showCloseBtn
        && <span className={`us-capsule__close-btn ${btnClassName}`}
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
  capsuleClassName: PropTypes.string,
  textClassName: PropTypes.string,
  btnClassName: PropTypes.string,
  showCloseBtn: PropTypes.bool,
};

Capsule.defaultProps = {
  showCloseBtn: true,
  capsuleClassName: '',
  textClassName: '',
  btnClassName: '',
};

export default Capsule;
