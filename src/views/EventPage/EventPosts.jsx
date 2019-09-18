import React, {
  Fragment, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import PostCard from '../../components/PostCard';
import Loader from '../../components/Loader/index';
import { useDebounce } from '../../helpers/hooksUtils';
import lang from '../../helpers/en.default';
import CompetitionFilter from '../../components/CompetitionFilter';

const debounceTime = 1000;

export const EventPosts = (props) => {
  const {
    posts, isLoading,
    isPostView, pagination,
    eventId, getEventPosts, isIntersected,
    handleLike, handleDisLike, eventCompetitions,
    competitionFilter, handleCompetitionFilter,
    handleBookmark,
  } = props;
  const isInitialMount = useRef(true);

  const fetchMoreContent = () => {
    const { limit, offset, totalCount } = pagination;
    if (isIntersected && isPostView && posts.length < totalCount) {
      const nextOffset = Number(offset) + Number(limit);
      getEventPosts({
        eventId,
        limit,
        offset: nextOffset,
        competitionId: competitionFilter,
        isNewFilter: false,
      });
    }
  };

  const debouncedFetchMoreContent = useDebounce(fetchMoreContent, debounceTime);
  const debounceGetEventPosts = useRef(() => {});

  useEffect(() => {
    debounceGetEventPosts.current = debounce(getEventPosts, (debounceTime / 2));
  }, [getEventPosts]);

  useEffect(() => {
    if (isInitialMount.current) {
      if (isPostView) {
        getEventPosts({ eventId, isNewFilter: true });
      }

      isInitialMount.current = false;
    } else if (!isLoading && debouncedFetchMoreContent) {
      debouncedFetchMoreContent();
    }
  }, [
    isPostView, getEventPosts, eventId,
    isLoading, posts, debouncedFetchMoreContent,
    isIntersected,
  ]);

  const handleCompetitonFilterClick = (competitionId) => {
    handleCompetitionFilter(competitionId);
    debounceGetEventPosts.current({
      eventId,
      competitionId,
      isNewFilter: true,
    });
  };

  const renderPosts = () => (
    <div className="eventpage__posts">
      {posts.map((post, index) => <PostCard
        post={post}
        key={index}
        handleLike={handleLike}
        handleDisLike={handleDisLike}
        handleBookmark={handleBookmark}
        />)}
    </div>
  );

  const renderLoader = () => (
		<div className="eventpage__posts-loader-container">
			<Loader containerClassName="eventpage__posts-loader" />
		</div>
  );

  const renderMessage = (message) => (
		<div className="eventpage__posts-message">
			<div className="text">{message}</div>
		</div>
  );

  return (
		<Fragment>
      <CompetitionFilter
        competitions={eventCompetitions}
        handleFilterSelect={handleCompetitonFilterClick}
        selectedCompetitionId={competitionFilter}
      />
      {!!posts.length && renderPosts()}
      {!posts.length && isLoading && renderLoader()}
      {!posts.length && !isLoading && renderMessage(lang.eventPage.posts.noPosts)}
		</Fragment>
  );
};

EventPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  eventId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isPostView: PropTypes.bool.isRequired,
  isIntersected: PropTypes.bool.isRequired,
  getEventPosts: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDisLike: PropTypes.func.isRequired,
  eventCompetitions: PropTypes.array.isRequired,
  handleCompetitionFilter: PropTypes.func.isRequired,
  competitionFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleBookmark: PropTypes.func.isRequired,
};

EventPosts.defaultProps = {
  isLoading: false,
  errorMessage: '',
};

export default EventPosts;
