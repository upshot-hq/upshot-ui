import React, {
  Fragment, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import PostCard from '../../components/PostCard';
import Loader from '../../components/Loader/index';
import { useDebounce } from '../../helpers/hooksUtils';

export const EventPosts = (props) => {
  const {
    posts, isLoading,
    isPostView, pagination,
    eventId, getEventPosts, isIntersected,
  } = props;
  const isInitialMount = useRef(true);

  const fetchMoreContent = () => {
    const { limit, offset, totalCount } = pagination;
    if (isIntersected && isPostView && posts.length < totalCount) {
      const nextOffset = Number(offset) + Number(limit);
      getEventPosts({ eventId, limit, offset: nextOffset });
    }
  };

  const debouncedFetchMoreContent = useDebounce(fetchMoreContent, 1000);

  useEffect(() => {
    if (isInitialMount.current) {
      if (isPostView && !posts.length) {
        getEventPosts({ eventId });
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

  const renderPosts = () => (
    <div className="eventpage__posts">
      {posts.map((post, index) => <PostCard post={post} key={index} />)}
    </div>
  );

  const renderLoader = () => (
		<div className="eventpage__posts-loader-container">
			<Loader containerClassName="eventpage__posts-loader" />
		</div>
  );

  return (
		<Fragment>
      {!!posts.length && renderPosts()}
      {!posts.length && isLoading && renderLoader()}
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
};

EventPosts.defaultProps = {
  isLoading: false,
  errorMessage: '',
};

export default EventPosts;
