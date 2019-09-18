import React, {
  Fragment, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader/index';
import { useDebounce } from '../../helpers/hooksUtils';
import lang from '../../helpers/en.default';
import EventCard from '../../components/EventCard/index';

const debounceTime = 1000;

export const Events = (props) => {
  const {
    events, isLoading, IsEventView,
    getUserEvents, isIntersected, handlePin,
    pagination,
  } = props;
  const isInitialMount = useRef(true);
  const fetchMoreContent = () => {
    const { limit, offset, totalCount } = pagination;
    if (isIntersected && IsEventView && events.length < totalCount) {
      const nextOffset = Number(offset) + Number(limit);
      getUserEvents({ limit, offset: nextOffset });
    }
  };

  const debouncedFetchMoreContent = useDebounce(fetchMoreContent, debounceTime);

  useEffect(() => {
    if (isInitialMount.current) {
      if (IsEventView) {
        getUserEvents({});
      }

      isInitialMount.current = false;
    } else if (!isLoading && debouncedFetchMoreContent) {
      debouncedFetchMoreContent();
    }
  }, [
    IsEventView, getUserEvents,
    isLoading, events, debouncedFetchMoreContent,
    isIntersected,
  ]);

  const renderEvents = () => (
    <div className="profilepage__events">
      {events.map((event, index) => <EventCard
        event={event}
        key={index}
        handlePin={handlePin}
      />)}
    </div>
  );

  const renderLoader = () => (
		<div className="profilepage__events-loader-container">
			<Loader containerClassName="profilepage__events-loader" />
		</div>
  );

  const renderMessage = (message) => (
		<div className="profilepage__events-message">
			<div className="text">{message}</div>
		</div>
  );

  return (
		<Fragment>
      {!!events.length && renderEvents()}
      {!events.length && isLoading && renderLoader()}
      {!events.length && !isLoading && renderMessage(lang.profilePage.events.noEvents)}
		</Fragment>
  );
};

Events.propTypes = {
  events: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  IsEventView: PropTypes.bool.isRequired,
  isIntersected: PropTypes.bool.isRequired,
  getUserEvents: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePin: PropTypes.func.isRequired,
};

Events.defaultProps = {
  isLoading: false,
  errorMessage: '',
};

export default Events;
