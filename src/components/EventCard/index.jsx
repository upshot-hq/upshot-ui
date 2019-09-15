import React, {
  Fragment, useState, useRef, useEffect,
} from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './EventCard.scss';
import Capsule from '../Capsule';
import pin from '../../assets/pin.svg';
import pinFill from '../../assets/pin-fill.svg';
import { handleEventReaction } from '../../helpers/utils';
import { reactions, debounceTime } from '../../helpers/defaults';

const EventCard = (props) => {
  const { event: reduxEvent, handlePin } = props;
  const [event, setEvent] = useState(reduxEvent);
  const debouncePin = useRef(() => {});

  useEffect(() => {
    debouncePin.current = debounce(handlePin, debounceTime);
  }, [handlePin]);

  const footerLabels = {
    upcoming: 'upcoming',
    started: 'started',
    ended: 'ended',
  };

  const togglePinned = (eventId) => {
    const userPin = !event.user_pins;
    setEvent(handleEventReaction(reactions.pin, event, userPin));
    debouncePin.current(eventId, userPin);
  };

  const renderTitle = () => {
    const iconClassName = event.user_pins ? 'icon pinned' : 'icon';
    const pinIcon = event.user_pins ? pinFill : pin;
    return (
      <div className="event-card__content-event-title">
        <Link to={`/events/${event.id}`} className="text">{event.name}</Link>
        <span className={iconClassName} onClick={() => togglePinned(event.id)}>
          <img src={pinIcon} alt="pin" />
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
          textStyle={{ maxWidth: '100%' }}
        />
      </Fragment>
  );

  const renderCompetitions = (competitions) => (
    <div className="event-card__content-event-competitions">
      <div className="event-competitions__container">
        {competitions.map((competition) => renderCompetition(competition))}
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
    <div id="event-card" className="event-card">
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
  handlePin: PropTypes.func.isRequired,
};

export default EventCard;
