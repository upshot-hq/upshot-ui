import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './SearchBar.scss';

const SearchBar = ({
  placeholder, id, key, handleChange,
  capsuleStyle, textStyle, closeBtnStyle,
}) => (
  <div className="us-search">
    {/* <div className="us-search__bar"> */}
      <div className="us-search__icon">
      <FontAwesome name="search" />
      </div>
      <input type="text" name="search"
        className="us-search__input" placeholder={placeholder}
        onChange={handleChange}
      />
    {/* </div> */}
  </div>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  key: PropTypes.string,
  closeBtnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  capsuleStyle: PropTypes.object,
};

SearchBar.defaultTypes = {
  placeholder: 'search here',
};

export default SearchBar;
