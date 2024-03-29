import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowBack, MoreHoriz } from '@material-ui/icons';

import './GeneralSearchBar.scss';
import SearchBar from '../SearchBar';
import { history, isResourceEvent, isResourceEventPost } from '../../helpers/utils';
import { resources, searchScopes, rearrangedString } from '../../helpers/defaults';

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
    const isEvent = isResourceEvent(resultItem);
    const isEventPost = isResourceEventPost(resultItem);

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
        <ArrowBack />
      </div>
      }
      <div className={`bar ${rearranged.current}`}>
        {renderSearchBar()}
      </div>
      {showOptionsBtn && <div
        className={`icon options-btn ${rearranged.current}`}
      >
        <MoreHoriz />
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
