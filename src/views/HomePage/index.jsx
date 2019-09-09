import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import './HomePage.scss';
import Loader from '../../components/Loader';

const HomePage = ({ eventsPosts, getPinnedEventsPosts, isEventsPostsLoading }) => {
  useEffect(() => {
    getPinnedEventsPosts(10, 0);
  }, [getPinnedEventsPosts]);

  const renderSearchBar = () => (
		<div className="searchbar">
			<div className="icon back-btn">
			<FontAwesome name="arrow-left" />
			</div>
			<div className="bar">
				<div className="search-icon">
				<FontAwesome name="search" />
				</div>
				<input type="text" name="search" className="search-input"/>
			</div>
			<div className="icon options-btn">
				<FontAwesome name="ellipsis-h" />
			</div>
		</div>
  );

  return (
		<Layout>
			<div className="homepage">
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
				<div className="content">
          {(!isEventsPostsLoading && !eventsPosts.length) && <div className="content__no-content">
            <p>No Posts to show. Try exploring...</p>
          </div>}
          {(eventsPosts.length > 0) && eventsPosts.map((post, i) => (
            <PostCard
              key={i}
              post={post}
              competition={post.competitions_name}
              imageUrl={post.picture_url}
              username={post.user_username}
              caption={post.caption}
            />
          ))}
          {isEventsPostsLoading && <div className="content__loader">
            <Loader message="loading posts..." />
          </div>}
				</div>
			</div>
		</Layout>
  );
};

HomePage.propTypes = {
  eventsPosts: PropTypes.array.isRequired,
  isEventsPostsLoading: PropTypes.bool.isRequired,
  getPinnedEventsPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ eventPost }) => ({
  eventsPosts: eventPost.posts,
  isEventsPostsLoading: eventPost.isLoading,
  getEventsPostsError: eventPost.errors,
});

const mapDispatchToProps = {
  getPinnedEventsPosts: eventPostActions.getPinnedEventsPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
