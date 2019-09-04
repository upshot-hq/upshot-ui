import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Modal.scss';
import PromptModal from '../PromptModal';

const Modal = (props) => {
  const {
    children, isModalVisible, handleModalClose,
    showClosePrompt, promptMessage,
  } = props;
  const [showPrompt, setShowPrompt] = useState(false);

  const onModalClose = () => {
    if (showClosePrompt) {
      return setShowPrompt(showClosePrompt);
    }

    return handleModalClose();
  };

  const handlePromptCancel = () => {
    setShowPrompt(false);
  };

  const handlePromptOk = () => {
    setShowPrompt(false);
    handleModalClose();
  };

  const renderModal = () => (
		<div className="modal__container">
			<div className="close-btn" onClick={onModalClose}>
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
      {showClosePrompt && (
        <PromptModal
          showPrompt={showPrompt}
          handlePromptCancel={handlePromptCancel}
          handlePromptOk={handlePromptOk}
          promptMessage={promptMessage}
        />
      )}
    </div>
  );
};

Modal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  showClosePrompt: PropTypes.bool,
  promptMessage: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  isModalVisible: false,
  showClosePrompt: false,
  promptMessage: 'Are you sure you want to close this modal?',
};

export default Modal;
