import React from 'react';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

const fab = ({ onClickFunction }) => (
  <div className="fab-container" onClick={onClickFunction}>
    <FontAwesome
            key="plus"
            name="plus"
            size="2x"
            style={{ fontSize: '25px' }}
          />
  </div>
);

export default fab;
