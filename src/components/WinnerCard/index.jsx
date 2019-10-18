import React from 'react';
import PropTypes from 'prop-types';
import { beautifyPosition, modifyCounts } from '../../helpers/utils';
import Image from '../Image';
import SolidHeart from '../../assets/icons/solid-heart.svg';
import SolidHeartBreak from '../../assets/icons/solid-heartbreak.svg';
import './WinnerCard.scss';

const WinnerCard = ({
  winner,
}) => {
  const likes = modifyCounts(winner.likes);
  const dislikes = modifyCounts(winner.dislikes);
  return (
    <div id="winner-card" className="winnercard">
      <div className="winnercard__image">
        <Image imageUrl={winner.post_picture_url} />
      </div>
      <div className="winnercard__content">
        <div className="winnercard__icons">
          <div className="leftside">
            <span className="position">{beautifyPosition(winner.rank)}</span>
          </div>
          <div className="rightside">
            <div className="icon">
              <img src={SolidHeart} alt="solid-heart" />
              <div className="count">{likes}</div>
            </div>
            <div className="icon">
              <img src={SolidHeartBreak} alt="solid-heart" />
              <div className="count">{dislikes}</div>
            </div>
          </div>
        </div>
        <div className="winnercard__caption">
          <span className="username">{winner.winner_username} </span>
          <span className="text">{winner.caption}</span>
        </div>
      </div>
    </div>
  );
};

WinnerCard.propTypes = {
  winner: PropTypes.object.isRequired,
};

export default WinnerCard;
