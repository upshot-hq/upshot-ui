import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import queryString from 'query-string';

import './SearchPage.scss';
import { PropTypes } from 'prop-types';
import Layout from '../../components/Layout';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import lang from '../../helpers/en.default';
import PostCard from '../../components/PostCard/index';
import * as searchActions from '../../redux/actionCreators/searchActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import GeneralSearchBar from '../../components/GeneralSearchBar';
import { searchScopes } from '../../helpers/defaults';
import { isResourceEventPost, isResourceEvent } from '../../helpers/utils';

const SearchPage = (props) => {
  const {
    isLoading, searchResult, errorMessage,
    likePost, dislikePost,
    match, location, search,
    bookmarkPost,
  } = props;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = queryString.parse(location.search);
    if (searchQuery !== query.q) {
      setSearchQuery(query.q);
    }
  }, [setSearchQuery, searchQuery, location]);

  useEffect(() => {
    if (searchQuery) {
      search({
        scope: searchScopes.all,
        searchQuery,
        strict: false,
        isSearchPage: true,
      });
    }
  }, [search, searchQuery]);

  const handleLike = (postId, like) => {
    likePost(postId, like);
  };

  const handleDisLike = (postId, dislike) => {
    dislikePost(postId, dislike);
  };

  const handleBookmark = (postId, bookmark) => {
    bookmarkPost(postId, bookmark);
  };

  const renderTopBar = () => (
    <div className="topbar">
      <div className="icon back-btn">
        <FontAwesome name="arrow-left" />
      </div>
      <div className="bar">
        <GeneralSearchBar initialQuery={searchQuery} />
      </div>
      <div className="icon options-btn">
        <FontAwesome name="ellipsis-h" />
      </div>
    </div>
  );

  const renderError = (message) => (
    <div className="search-page__error">
      <div className="search-page__error-content">
        {message}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="content-container">
      {
        searchResult.map((resource, index) => {
				  const isEvent = isResourceEvent(resource);
				  const isEventPost = isResourceEventPost(resource);
				  if (isEvent) {
				    return <EventCard event={resource} key={index} />;
				  }

				  if (isEventPost) {
				    return <PostCard
              post={resource}
              key={index}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
              handleBookmark={handleBookmark} />;
				  }

				  return null;
        })
      }
    </div>
  );

  return (
    <Layout match={match}>
      <div className="search-page" id="search-page">
        <div className="header">
          <div className="top">
            <div className="title">
              <span className="title-text">{lang.searchPage.pageTitle}</span>
            </div>
            {renderTopBar()}
          </div>
        </div>
        <div className="content">
          {renderContent()}
          {searchQuery && isLoading && <Loader containerClassName="search-page__loader" />}
          {!searchQuery && renderError(lang.searchPage.noSearchQuery)}
          {searchQuery && !isLoading && !!errorMessage
              && renderError(lang.networkErrorMessage)}
          {searchQuery && !isLoading && !errorMessage
						&& !searchResult.length && renderError(lang.emptySearchResultMessage)}
        </div>
      </div>
    </Layout>
  );
};

SearchPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  searchResult: PropTypes.array.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ search }) => ({
  searchResult: search.searchPageResult,
  isLoading: search.isLoading,
  errorMessage: search.error.message,
});

const actionCreators = {
  search: searchActions.search,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, actionCreators)(SearchPage);
