import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './UpcomingContent.scss';
import lang from '../../helpers/en.default';
import { useIntersect } from '../../helpers/hooksUtils';
import EventCard from '../EventCard';
import { isResourceEvent } from '../../helpers/utils';
import Loader from '../Loader/index';

const UpcomingContent = (props) => {
  const {
    content, isLoadingContent, pinEvent,
    contentErrors, contentPagination,
    fetchUpcomingContent,
  } = props;
  const contentContainerRef = useRef(null);
  const [setNode, isIntersected] = useIntersect(
    { root: contentContainerRef.current, threshold: 0.5 },
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && !content.length) {
      isInitialMount.current = false;
      fetchUpcomingContent({});
    }
  }, [fetchUpcomingContent, content]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!isLoadingContent) {
      const fetchMoreContent = () => {
        const { limit, offset, totalCount } = contentPagination;
        if (isIntersected && content.length < totalCount) {
          const nextOffset = Number(offset) + Number(limit);
          fetchUpcomingContent({ limit, offset: nextOffset });
        }
      };

      fetchMoreContent();
    }
  }, [
    contentPagination, isIntersected, content,
    fetchUpcomingContent, isLoadingContent,
  ]);

  const handlePin = (eventId, pin) => {
    pinEvent(eventId, pin);
  };

  const renderMessage = (message) => (
    <div className="upcoming-content__message">{message}</div>
  );

  const renderFetchMoreTrigger = () => (
    <div className="upcoming-content__fetch-more" ref={setNode} />
  );

  const renderUpcomingContent = () => (
    <Fragment>
      {
        content.map((resource, index) => {
				  const isEvent = isResourceEvent(resource);
				  if (isEvent) {
				    return <EventCard
              event={resource}
              key={index}
              handlePin={handlePin}
              showCompetitions={false}
              smallCard
            />;
				  }

				  return null;
        })
      }
      {isLoadingContent && <Loader containerClassName="upcoming-content__loader" />}
      {!isLoadingContent && !!contentErrors
        && renderMessage(lang.failedToFetch)}
      {!isLoadingContent && !contentErrors
        && !content.length && renderMessage(lang.layout.rightSide.noUpcomingContent)
      }
      {renderFetchMoreTrigger()}
    </Fragment>
  );

  return (
    <div id="upcoming-content" className="upcoming-content" ref={contentContainerRef}>
      {renderUpcomingContent()}
    </div>
  );
};

UpcomingContent.propTypes = {
  content: PropTypes.array.isRequired,
  isLoadingContent: PropTypes.bool.isRequired,
  contentPagination: PropTypes.object.isRequired,
  contentErrors: PropTypes.string.isRequired,
  fetchUpcomingContent: PropTypes.func.isRequired,
  pinEvent: PropTypes.func,
};

UpcomingContent.defaultProps = {
  pinEvent: () => {},
};

export default UpcomingContent;
