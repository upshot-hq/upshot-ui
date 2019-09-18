import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './GeneralSearchBar.scss';
import SearchBar from '../SearchBar';
import { history } from '../../helpers/utils';
import {
  resources, searchScopes, eventKeys,
  eventPostKeys, rearrangedString,
} from '../../helpers/defaults';

const GeneralSearchBar = (props) => {
  const { showBackBtn, showOptionsBtn, initialQuery } = props;
  const rearranged = useRef('');

  useEffect(() => {
    if (!rearranged.current && (!showBackBtn || !showOptionsBtn)) {
      rearranged.current = rearrangedString;
    }
  }, [rearranged, showBackBtn, showOptionsBtn]);

  const getSearchResultTitleAndValue = (resultItem) => {
    const titleAndValue = { title: '', value: '', type: '' };
    const isEvent = (eventKeys.startAt in resultItem);
    const isEventPost = (eventPostKeys.caption in resultItem);

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

  const handleBackBtnClick = () => {
    history.goBack();
  };

  const renderSearchBar = () => (
    <Fragment>
      <SearchBar
        searchScope={searchScopes.all}
        getSearchResultTitleAndValue={getSearchResultTitleAndValue}
        handleSearchResultClick={handleSearchResultClick}
        initialQuery={initialQuery}
        allowEnterClickToSearchPage
      />
    </Fragment>
  );

  const renderContent = () => (
		<Fragment>
      {showBackBtn && <div
          className={`icon back-btn ${rearranged.current}`}
          onClick={handleBackBtnClick}
        >
			    <FontAwesome name="arrow-left" />
        </div>
      }
			<div className={`bar ${rearranged.current}`}>
        {renderSearchBar()}
			</div>
      {showOptionsBtn && <div
          className={`icon options-btn ${rearranged.current}`}
        >
          <FontAwesome name="ellipsis-h" />
        </div>
      }
		</Fragment>
  );

  return (
    <div className={`generalSearch ${rearranged.current}`} id="us-generalSearch">
      {renderContent()}
    </div>
  );
};

GeneralSearchBar.propTypes = {
  initialQuery: PropTypes.string,
  showBackBtn: PropTypes.bool,
  showOptionsBtn: PropTypes.bool,
};

GeneralSearchBar.defaultProps = {
  initialQuery: '',
  showBackBtn: true,
  showOptionsBtn: true,
};

export default GeneralSearchBar;
