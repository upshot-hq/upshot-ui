import React, {
  Fragment, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader/index';
import { useDebounce } from '../../helpers/hooksUtils';
import lang from '../../helpers/en.default';
import PostCard from '../../components/PostCard';

const debounceTime = 1000;

export const Bookmarks = ({
  bookmarks, isLoading, IsBookmarkView,
  getUserBookmarks, isIntersected, pagination,
  handleLike, handleDisLike, handleBookmark,
}) => {
  const isInitialMount = useRef(true);
  const fetchMoreContent = () => {
    const { limit, offset, totalCount } = pagination;
    if (isIntersected && IsBookmarkView && bookmarks.length < totalCount) {
      const nextOffset = Number(offset) + Number(limit);
      getUserBookmarks({ limit, offset: nextOffset });
    }
  };

  const debouncedFetchMoreContent = useDebounce(fetchMoreContent, debounceTime);

  useEffect(() => {
    if (isInitialMount.current) {
      if (IsBookmarkView) {
        getUserBookmarks({});
      }

      isInitialMount.current = false;
    } else if (!isLoading && debouncedFetchMoreContent) {
      debouncedFetchMoreContent();
    }
  }, [
    IsBookmarkView, getUserBookmarks,
    isLoading, bookmarks, debouncedFetchMoreContent,
    isIntersected,
  ]);

  const renderPosts = () => (
    <div className="profilepage__posts">
      {bookmarks.map((bookmark, index) => <PostCard
        post={bookmark}
        key={index}
        handleBookmark={handleBookmark}
        handleDisLike={handleDisLike}
        handleLike={handleLike}
      />)}
    </div>
  );

  const renderLoader = () => (
		<div className="profilepage__posts-loader-container">
			<Loader containerClassName="profilepage__posts-loader" />
		</div>
  );

  const renderMessage = (message) => (
		<div className="profilepage__posts-message">
			<div className="text">{message}</div>
		</div>
  );

  return (
		<Fragment>
      {!!bookmarks.length && renderPosts()}
      {!bookmarks.length && isLoading && renderLoader()}
      {!bookmarks.length && !isLoading && renderMessage(lang.profilePage.bookmarks.noBookmarks)}
		</Fragment>
  );
};

Bookmarks.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  IsBookmarkView: PropTypes.bool.isRequired,
  isIntersected: PropTypes.bool.isRequired,
  getUserBookmarks: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  handleDisLike: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired,
};

Bookmarks.defaultProps = {
  isLoading: false,
  errorMessage: '',
};

export default Bookmarks;
