import React, { useState } from 'react';
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

const PostCard = ({
  post,
}) => {
  const [isLiked, setLike] = useState(false);
  const [isDisLiked, setDisLike] = useState(false);
  const [isBookmarked, setBookmark] = useState(false);

  const handleLike = () => {
    setLike(!isLiked);
  };

  const handleDisLike = () => {
    setDisLike(!isDisLiked);
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
            {!isLiked && <img src={Heart} onClick={handleLike} alt="like" />}
            {isLiked && <img src={SolidHeart} onClick={handleLike} alt="like" />}
            <div className="count">24</div>
          </div>
          <div className="icon">
            {!isDisLiked && <img src={HeartBreak} onClick={handleDisLike} alt="dislike" />}
            {isDisLiked && <img src={SolidHeartBreak} onClick={handleDisLike} alt="dislike" />}
            <div className="count">1</div>
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
    competitions_name: PropTypes.string.isRequired,
    picture_url: PropTypes.string.isRequired,
    user_username: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};

export default PostCard;
