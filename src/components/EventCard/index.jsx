import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import './EventCard.scss';
import { competitions } from '../../views/ExplorePage/__mocks__';
import Capsule from '../Capsule';

const EventCard = (props) => {
  const { event } = props;
  const [pinned, setPinned] = useState(false);

  const footerLabels = {
    upcoming: 'upcoming',
    started: 'started',
    ended: 'ended',
  };

  const togglePinned = () => {
    setPinned(!pinned);
  };

  const renderTitle = () => {
    const iconClassName = pinned ? 'icon pinned' : 'icon';

    return (
      <div className="event-card__content-event-title">
        <span>{event.name}</span>
        <span className={iconClassName} onClick={togglePinned}>
          <FontAwesome name="bookmark" />
        </span>
      </div>
    );
  };

  const renderCompetition = (competition) => (
      <Fragment key={competition.id}>
        <Capsule
          title={competition.name}
          id={competition.id}
          handleClose={() => {}}
          showCloseBtn={false}
        />
      </Fragment>
  );

  const renderCompetitions = (competitonIds) => (
    <div className="event-card__content-event-competitions">
      <div className="event-competitions__container">
        {
          competitonIds.map((id) => {
            const competition = competitions.find((comp) => comp.id === id);
            if (competition) return renderCompetition(competition);
            return null;
          })
        }
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="event-card__content-event-stats">
      <div className="stats-content">
        <div className="text posts">
          <span className="count">500</span>
          <span className="label">posts</span>
        </div>
        <div className="text pins">
          <span className="count">1873</span>
          <span className="label">pins</span>
        </div>
      </div>
    </div>
  );

  const renderFooter = (startAt, endAt) => {
    let label = footerLabels.upcoming;
    const startTime = moment(startAt);
    const endTime = moment(endAt);
    let value = startTime.fromNow();
    if (moment().isSame(startTime) || moment().isAfter(startTime)) {
      label = footerLabels.started;
    }

    if (moment().isSame(endTime) || moment().isAfter(endTime)) {
      label = footerLabels.ended;
      value = endTime.fromNow();
    }

    return (
      <div className={`event-card__footer ${label}`}>
          <div className="event-card__footer-content">
            <span className="text label">{label}:</span>
            <span className={`text value ${label}`}>{value}</span>
          </div>
      </div>
    );
  };

  return (
    <div id="event-card">
      <div className="event-card__content">
        {renderTitle()}
        {renderCompetitions(event.competitions)}
        {renderStats()}
      </div>
      {renderFooter(event.start_at, event.end_at)}
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
