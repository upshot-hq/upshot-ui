import React, { useState, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import './PostCard.scss';
import Image from '../Image';
import HeartBreak from '../../assets/icons/heartbreak.svg';
import SolidHeartBreak from '../../assets/icons/solid-heartbreak.svg';
import Heart from '../../assets/icons/heart.svg';
import SolidHeart from '../../assets/icons/solid-heart.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import SolidBookmark from '../../assets/icons/solid-bookmark.svg';
import { handlePostReaction } from '../../helpers/utils';
import { reactions, debounceTime } from '../../helpers/defaults';

const PostCard = ({
  post: reduxPost, handleLike, handleDisLike,
}) => {
  const [isBookmarked, setBookmark] = useState(false);
  const [post, setPost] = useState(reduxPost);
  const debounceLike = useRef(() => {});
  const debounceDisLike = useRef(() => {});
  useEffect(() => {
    debounceLike.current = debounce(handleLike, debounceTime);
    debounceDisLike.current = debounce(handleDisLike, debounceTime);
  }, [handleLike, handleDisLike]);

  const toggleLike = (postId) => {
    const like = !post.user_likes;
    setPost(handlePostReaction(reactions.like, post, like));
    debounceLike.current(postId, like);
  };

  const toggleDisLike = (postId) => {
    const dislike = !post.user_dislikes;
    setPost(handlePostReaction(reactions.like, post, dislike));
    debounceDisLike.current(postId, dislike);
  };

  const handleBookmark = () => {
    setBookmark(!isBookmarked);
  };

  const formatDate = (date) => {
    const momentDate = moment(date);
    return momentDate.fromNow();
  };

  return (
    <div className="postcard">
      <div className="postcard__postImage">
        <div className="competition">{post.competitions_name}</div>
        <Image imageUrl={post.picture_url} />
      </div>
      <div className="postcard__icons">
        <div className="leftside">
          <div className="icon">
            {!post.user_likes
              && <img src={Heart} onClick={() => toggleLike(post.id)} alt="like" />}
            {post.user_likes
              && <img src={SolidHeart} onClick={() => toggleLike(post.id)} alt="like" />}
            {(post.total_likes > 0)
              && <div className="count">{post.total_likes}</div>}
          </div>
          <div className="icon">
            {!post.user_dislikes
              && <img src={HeartBreak}
              onClick={() => toggleDisLike(post.id)} alt="dislike" />}
            {post.user_dislikes
              && <img src={SolidHeartBreak}
              onClick={() => toggleDisLike(post.id)} alt="dislike" />}
            {(post.total_dislikes > 0) && <div className="count">{post.total_dislikes}</div>}
          </div>
        </div>
        <div className="icon">
          {!isBookmarked && <img src={Bookmark} onClick={handleBookmark} alt="bookmark" />}
          {isBookmarked && <img src={SolidBookmark} onClick={handleBookmark} alt="bookmark" />}

        </div>
      </div>
      <div className="postcard__caption">
        <span className="username">{post.user_username} </span>
        <span className="text">{post.caption}</span>
      </div>
      <div className="postcard__date">
        <span className="postdate">{formatDate(post.created_at)}</span>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    competitions_name: PropTypes.string.isRequired,
    picture_url: PropTypes.string.isRequired,
    user_username: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user_likes: PropTypes.bool,
    user_dislikes: PropTypes.bool,
    total_likes: PropTypes.string,
    total_dislikes: PropTypes.string,
  }),
  handleLike: PropTypes.func.isRequired,
  handleDisLike: PropTypes.func.isRequired,
};

export default PostCard;
