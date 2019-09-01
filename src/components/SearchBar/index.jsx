import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './SearchBar.scss';
import { useDebounce } from '../../helpers/hooks-utils';
import lang from '../../helpers/en.default';
import * as searchActions from '../../redux/actionCreators/searchActions';
import Loader from '../Loader';

const SearchBar = ({
  placeholder, searchError,
  iconStyle, inputStyle, searchIsLoading,
  search, searchScope, searchResult,
  searchResultTitleProperty, searchResultValueProperty,
  handleSearchResultClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResultContainer, setShowResultContainer] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setShowResultContainer(true);
      search({ scope: searchScope, searchQuery: debouncedSearchQuery });
    } else {
      setShowResultContainer(false);
    }
  }, [debouncedSearchQuery, searchScope, search]);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const renderSearchBar = () => (
    <div className="us-search__bar">
      <div className="us-search__bar-icon" style={iconStyle}>
      <FontAwesome name="search" />
      </div>
      <input type="text" name="search" style={inputStyle}
        className="us-search__bar-input" placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderMessage = () => {
    const message = !searchResult.length && !searchError
      ? lang.emptySearchResultMessage : searchError;

    return (
      <div className="row message">
        {message}
      </div>
    );
  };

  const renderSearchResult = () => (
    <Fragment>
      {/* {
        searchResult.map((result, index) => (
          <div className="row" key={index} id={result[searchResultValueProperty]}>
            <div className="text">
              <span>{result[searchResultTitleProperty]}</span>
            </div>
          </div>))

      } */}
      <div className="row" key="1" id="2"
        onClick={() => handleSearchResultClick({
          hashtag: '#theCrib', id: '2', competitions: [1, 2],
        })}
      >
        <div className="text">
          <span>#theCrib</span>
        </div>
      </div>
    </Fragment>
  );

  const renderContent = () => (
    <Fragment>
      {
        searchResult.length
        // true
          ? renderSearchResult()
          : renderMessage()
      }
    </Fragment>
  );

  const renderSearchResultContainer = () => (
    <div className="us-search__result">
    {
      searchIsLoading
      // true
        ? <div className="row loading">
            <Loader customStyles={{ width: '15px', height: '15px' }} />
          </div>
        : renderContent()
    }
    </div>
  );

  return (
    <Fragment>
      <div className="us-search">
        {renderSearchBar()}
        {showResultContainer && renderSearchResultContainer()}
      </div>
    </Fragment>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  inputStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  searchIsLoading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  searchScope: PropTypes.string.isRequired,
  searchResultTitleProperty: PropTypes.string.isRequired,
  searchResultValueProperty: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
  searchError: PropTypes.string.isRequired,
  handleSearchResultClick: PropTypes.func.isRequired,
};

SearchBar.defaultTypes = {
  placeholder: 'search here',
};

const mapStateToProps = ({ search }) => ({
  searchIsLoading: search.isLoading,
  searchResult: search.result,
  searchError: search.error.message,
});

const actionCreators = {
  search: searchActions.search,
};

export default connect(mapStateToProps, actionCreators)(SearchBar);
