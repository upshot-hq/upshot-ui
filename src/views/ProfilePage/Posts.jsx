import React, {
  Fragment, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader/index';
import { useDebounce } from '../../helpers/hooksUtils';
import lang from '../../helpers/en.default';
import PostCard from '../../components/PostCard';

const debounceTime = 1000;

export const Posts = (props) => {
  const {
    posts, isLoading, IsPostView,
    getUserPosts, isIntersected, pagination,
    handleLike, handleDisLike, handleBookmark,
  } = props;
  const isInitialMount = useRef(true);
  const fetchMoreContent = () => {
    const { limit, offset, totalCount } = pagination;
    if (isIntersected && IsPostView && posts.length < totalCount) {
      const nextOffset = Number(offset) + Number(limit);
      getUserPosts({ limit, offset: nextOffset });
    }
  };

  const debouncedFetchMoreContent = useDebounce(fetchMoreContent, debounceTime);

  useEffect(() => {
    if (isInitialMount.current) {
      if (IsPostView) {
        getUserPosts({});
      }

      isInitialMount.current = false;
    } else if (!isLoading && debouncedFetchMoreContent) {
      debouncedFetchMoreContent();
    }
  }, [
    IsPostView, getUserPosts,
    isLoading, posts, debouncedFetchMoreContent,
    isIntersected,
  ]);

  const renderPosts = () => (
    <div className="profilepage__posts">
      {posts.map((post, index) => <PostCard
        post={post}
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
      {!!posts.length && renderPosts()}
      {!posts.length && isLoading && renderLoader()}
      {!posts.length && !isLoading && renderMessage(lang.profilePage.posts.noPosts)}
		</Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  IsPostView: PropTypes.bool.isRequired,
  isIntersected: PropTypes.bool.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  handleDisLike: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired,
};

Posts.defaultProps = {
  isLoading: false,
  errorMessage: '',
};

export default Posts;
