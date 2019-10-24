import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './PromptModal.scss';
import Button from '../Button';

const PromptModal = (props) => {
  const {
    promptMessage, showPrompt,
    handlePromptCancel, handlePromptOk,
  } = props;

  const renderPrompt = () => (
    <div className="prompt__container">
      <div className="us-modal__prompt">
        <div className="us-modal__prompt-message">
          <div className="prompt-message__content">
            {promptMessage}
          </div>
        </div>
        <div className="us-modal__prompt-actions">
          <div className="prompt-actions__btn">
            <Button
              title="cancel" handleClick={handlePromptCancel}
              customClassName="prompt-btn"
            />
          </div>
          <div className="prompt-actions__btn">
            <Button
              title="ok" handleClick={handlePromptOk}
              customClassName="prompt-btn prompt-btn__ok"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {
        showPrompt && (
          <div className="us-prompt">
            {renderPrompt()}
          </div>
        )
      }
    </Fragment>
  );
};

PromptModal.propTypes = {
  promptMessage: PropTypes.string,
  handlePromptCancel: PropTypes.func.isRequired,
  handlePromptOk: PropTypes.func.isRequired,
  showPrompt: PropTypes.bool.isRequired,
};

PromptModal.defaultProps = {
  promptMessage: 'Confirm this action?',
};

export default PromptModal;
