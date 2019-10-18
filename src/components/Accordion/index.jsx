import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Accordion.scss';

const Accordion = ({
  isOpen, children, title,
}) => {
  const [isAccordionOpen, setAccordionState] = useState(isOpen);

  const toggleAccordionState = () => {
    setAccordionState(!isAccordionOpen);
  };

  return (
    <div className="accordion">
      <div className="title" onClick={toggleAccordionState}>
        <span className="caption">{title}</span>
        {!isAccordionOpen
                && <FontAwesome name="caret-down" className="icon" />}
        {isAccordionOpen
                && <FontAwesome name="caret-up" className="icon" />}
      </div>
      {isAccordionOpen && <div className="accordion__content">
        {children}
      </div>}
    </div>
  );
};

Accordion.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
};

Accordion.defaultProps = {
  children: null,
  isOpen: true,
  title: '',
};

export default Accordion;
