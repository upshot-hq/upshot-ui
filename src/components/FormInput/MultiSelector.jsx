import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const MultiSelector = ({
  options, handleSelect, selectedOptions = [], info, error,
}) => (
    <div>
      <div className="form-input">
        <div className="multiselector">
          <div className="multiselector__selections">
            {(options.length) && options.map((option) => {
              const isSelected = selectedOptions
                .find((selectedOption) => (selectedOption === option.id.toString()));
              if (isSelected) {
                return (
                  <span key={option.id} id={option.id} onClick={handleSelect}
                  className="option selected">{option.name} <span>&times;</span></span>
                );
              }
              return (
                <span key={option.id} id={option.id} onClick={handleSelect}
                className="option">{option.name} <span>&#43;</span></span>
              );
            })}
            <span className="option">Best dressed <span>&#43;</span></span>
            <span className="option selected">Best angle <span>&times;</span></span>
            <span className="option selected">Funniest caption <span>&times;</span></span>
          </div>
          <span className="info">{info}</span>
          <span className="error">{error}</span>
        </div>
      </div>
    </div>
);

// proptypes
MultiSelector.propTypes = {
  options: PropTypes.array.isRequired,
  info: PropTypes.string.isRequired,
  error: PropTypes.string,
  selectedOptions: PropTypes.array,
  handleSelect: PropTypes.func.isRequired,
};

export default MultiSelector;
