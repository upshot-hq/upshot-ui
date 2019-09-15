import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './SearchBar.scss';
import { useDebounce } from '../../helpers/hooksUtils';
import { history } from '../../helpers/utils';
import lang from '../../helpers/en.default';
import * as searchActions from '../../redux/actionCreators/searchActions';
import Loader from '../Loader';
import { resources, enterKeyCode } from '../../helpers/defaults';
import Capsule from '../Capsule';

const SearchBar = ({
  placeholder, searchError,
  iconStyle, inputStyle, searchIsLoading,
  search, searchScope, searchResult, initialQuery,
  handleSearchResultClick, strictSearch, getSearchResultTitleAndValue,
  allowEnterClickToSearchPage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResultContainer, setShowResultContainer] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setShowResultContainer(true);
      search({ scope: searchScope, searchQuery: debouncedSearchQuery, strict: strictSearch });
    } else {
      setShowResultContainer(false);
    }
  }, [debouncedSearchQuery, searchScope, search, strictSearch]);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleRowClick = (rowValue, type = '') => {
    handleSearchResultClick(rowValue, type);
    setShowResultContainer(false);
  };

  const handleKeyDown = (e) => {
    if (allowEnterClickToSearchPage
      && (e.which === enterKeyCode || e.keyCode === enterKeyCode)) {
      history.push(`/search?q=${searchQuery}`);
    }
  };

  const renderSearchBar = () => (
    <div className="us-search__bar">
      <div className="us-search__bar-icon" style={iconStyle}>
      <FontAwesome name="search" />
      </div>
      <input type="text" name="search" style={inputStyle}
        className="us-search__bar-input" placeholder={placeholder}
        onChange={handleInputChange} defaultValue={initialQuery}
        autoComplete="off" onKeyDown={handleKeyDown}
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

  const renderResultItem = (result, index) => {
    const { title, value, type } = getSearchResultTitleAndValue(result);
    return (
      <div className="row" key={index}
        id={value}
        onClick={() => handleRowClick(result, type)}
      >
        <div className="row-content">
          <div className="text">
            <span>{title}</span>
          </div>
            {(type === resources.post) && <Capsule
              title="post"
              id={result.id}
              showCloseBtn={false}
              handleClose={() => handleRowClick(result, type)}
              capsuleClassName="us-search__row-capsule"
              textClassName="us-search__row-capsule-text"
            />}
          </div>
        </div>
    );
  };

  const renderSearchResult = () => (
    <Fragment>
      {searchResult.map((result, index) => (renderResultItem(result, index)))}
    </Fragment>
  );

  const renderContent = () => (
    <Fragment>
      {
        searchResult.length
          ? renderSearchResult()
          : renderMessage()
      }
    </Fragment>
  );

  const renderSearchResultContainer = () => (
    <div className="us-search__result">
    {
      searchIsLoading
        ? <div className="row loading">
            <Loader customStyles={{ width: '0.94rem', height: '0.94rem' }} />
          </div>
        : renderContent()
    }
    </div>
  );

  return (
    <Fragment>
      <div className="us-search" id="us-search">
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
  searchResult: PropTypes.array.isRequired,
  searchError: PropTypes.string.isRequired,
  handleSearchResultClick: PropTypes.func.isRequired,
  getSearchResultTitleAndValue: PropTypes.func.isRequired,
  strictSearch: PropTypes.bool,
  initialQuery: PropTypes.string,
  allowEnterClickToSearchPage: PropTypes.bool,
};

SearchBar.defaultProps = {
  placeholder: lang.defaultSearchPlaceholder,
  strictSearch: false,
  initialQuery: '',
  allowEnterClickToSearchPage: false,
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
