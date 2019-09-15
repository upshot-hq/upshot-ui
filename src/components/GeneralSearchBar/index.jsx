import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './GeneralSearchBar.scss';
import SearchBar from '../SearchBar';
import { history } from '../../helpers/utils';
import { resources, searchScopes } from '../../helpers/defaults';

const GeneralSearchBar = (props) => {
  const getSearchResultTitleAndValue = (resultItem) => {
    const titleAndValue = { title: '', value: '', type: '' };
    const isEvent = ('start_at' in resultItem);
    const isEventPost = ('caption' in resultItem);

    if (isEvent) {
      titleAndValue.title = resultItem.hashtag;
      titleAndValue.value = resultItem.id;
      titleAndValue.type = resources.event;
    } else if (isEventPost) {
      titleAndValue.title = resultItem.event_hashtag;
      titleAndValue.value = resultItem.id;
      titleAndValue.type = resources.post;
    }

    return titleAndValue;
  };

  const handleSearchResultClick = (resultItem, type) => {
    let eventId;
    if (type === resources.event) {
      eventId = resultItem.id;
    } else if (type === resources.post) {
      eventId = resultItem.event_id;
    }

    history.push(`/events/${eventId}`);
  };

  const renderSearch = () => (
    <Fragment>
      <SearchBar
        searchScope={searchScopes.all}
        getSearchResultTitleAndValue={getSearchResultTitleAndValue}
        handleSearchResultClick={handleSearchResultClick}
        initialQuery={props.initialQuery}
        allowEnterClickToSearchPage
      />
    </Fragment>
  );

  return (
    <div className="generalSearch" id="us-generalSearch">
      {renderSearch()}
    </div>
  );
};

GeneralSearchBar.propTypes = {
  initialQuery: PropTypes.string,
};

GeneralSearchBar.defaultProps = {
  initialQuery: '',
};

export default GeneralSearchBar;
