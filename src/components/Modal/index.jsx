import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Modal.scss';

const Modal = (props) => {
  const { children, isModalVisible, handleModalClose } = props;

  const renderModal = () => (
		<div className="modal__container">
			<div className="close-btn" onClick={handleModalClose}>
				<FontAwesome name="times" />
			</div>
			<div className="content">
        {children}
      </div>
		</div>
  );

  return (
    <div className="up-modal">
      {isModalVisible && renderModal()}
    </div>
  );
};

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
  isModalVisible: false,
};

export default Modal;
