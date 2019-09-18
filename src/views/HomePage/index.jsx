import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import './HomePage.scss';
import Loader from '../../components/Loader';
import { useIntersect } from '../../helpers/hooksUtils';
import lang from '../../helpers/en.default';
import GeneralSearchBar from '../../components/GeneralSearchBar/index';

const HomePage = ({
  eventsPosts, getPinnedEventsPosts, isEventsPostsLoading, pagination,
  likePost, dislikePost, match, bookmarkPost,
}) => {
  const [setNode, isIntersected] = useIntersect({ threshold: 0.5 });
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!isEventsPostsLoading) {
      const { limit, offset, total_count: totalCount } = pagination;
      if (isIntersected && eventsPosts.length < totalCount) {
        const nextOffset = Number(offset) + Number(limit);
        getPinnedEventsPosts(limit, nextOffset);
      }
    }
  }, [getPinnedEventsPosts, isEventsPostsLoading, pagination, eventsPosts, isIntersected]);

  useEffect(() => {
    getPinnedEventsPosts(10, 0, true);
  }, [getPinnedEventsPosts]);

  const handleLike = (postId, like) => {
    likePost(postId, like);
  };

  const handleDisLike = (postId, dislike) => {
    dislikePost(postId, dislike);
  };

  const handleBookmark = (postId, bookmark) => {
    bookmarkPost(postId, bookmark);
  };

  const renderFetchMoreTrigger = () => (
    <div className="fetch-more" ref={setNode} />
  );

  const renderSearchBar = () => (
		<div className="searchbar">
			<div className="icon back-btn">
			  <FontAwesome name="arrow-left" />
			</div>
			<div className="bar">
        <GeneralSearchBar />
			</div>
			<div className="icon options-btn">
				<FontAwesome name="ellipsis-h" />
			</div>
		</div>
  );

  return (
		<Layout match={match}>
			<div className="homepage" id="homepage">
				<div className="header">
					<div className="top">
						{renderSearchBar()}
					</div>
					<div className="bottom">
						<div className="nav__items">
							<div key={1} className="nav__items-item">Top</div>
							<div key={2} className="nav__items-item">latest</div>
							<div key={3} className="nav__items-item">people</div>
							<div key={4} className="nav__items-item">photos</div>
							<div key={5} className="nav__items-item">videos</div>
						</div>
					</div>
				</div>
          {(!isEventsPostsLoading && !eventsPosts.length) && <div className="no-content">
            <p>{lang.homepage.noPosts}</p>
          </div>}
				<div className="content">
					<div className="content-container">
						{(eventsPosts.length > 0) && eventsPosts.map((post, i) => (
							<PostCard
								key={i}
								post={post}
								competition={post.competitions_name}
								imageUrl={post.picture_url}
								username={post.user_username}
                caption={post.caption}
                handleLike={handleLike}
                handleDisLike={handleDisLike}
                handleBookmark={handleBookmark}
							/>
						))}
						{isEventsPostsLoading && <div className="content__loader">
							<Loader containerClassName="loader-container" />
            </div>}
            {renderFetchMoreTrigger()}
					</div>
				</div>
			</div>
		</Layout>
  );
};

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
  eventsPosts: PropTypes.array.isRequired,
  isEventsPostsLoading: PropTypes.bool.isRequired,
  getPinnedEventsPosts: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  bookmarkPost: PropTypes.func.isRequired,
};

const mapStateToProps = ({ eventPost }) => ({
  eventsPosts: eventPost.posts,
  isEventsPostsLoading: eventPost.isLoading,
  getEventsPostsError: eventPost.errors,
  pagination: eventPost.pagination,
});

const mapDispatchToProps = {
  getPinnedEventsPosts: eventPostActions.getPinnedEventsPosts,
  likePost: eventPostActions.likePost,
  dislikePost: eventPostActions.dislikePost,
  bookmarkPost: eventPostActions.bookmarkPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
