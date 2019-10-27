import React, {
  Fragment, useState, useRef, useEffect,
} from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import './EventCard.scss';
import Capsule from '../Capsule';
import pin from '../../assets/pin.svg';
import pinFill from '../../assets/pin-fill.svg';
import { handleEventReaction, modifyCounts } from '../../helpers/utils';
import { reactions } from '../../helpers/defaults';
import { LayoutContext } from '../Layout/index';
import lang from '../../helpers/en.default';

const debounceTime = 1000;
const SMALL_CARD_CLASS = 'small';

const EventCard = (props) => {
  const { event: reduxEvent, handlePin } = props;
  const [event, setEvent] = useState(reduxEvent);
  const debouncePin = useRef(() => {});

  useEffect(() => {
    debouncePin.current = debounce(handlePin, debounceTime);
  }, [handlePin]);

  useEffect(() => {
    setEvent(reduxEvent);
  }, [reduxEvent]);

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

  const renderStats = (
    setShowPostToEventModal, setEventOnLayout, setShowPostToEventSearchBar,
  ) => {
    const postCount = modifyCounts(event.total_posts);
    const pinCount = modifyCounts(event.total_pins);
    const startTime = moment(event.start_at);
    const endTime = moment(event.end_at);
    let showPostToEventBtn = false;
    if (moment().isSame(startTime) || moment().isAfter(startTime)) {
      showPostToEventBtn = true;
    }

    if (moment().isSame(endTime) || moment().isAfter(endTime)) {
      showPostToEventBtn = false;
    }

    return (
      <div className="event-card__content-event-stats">
        <div className="stats-content">
          <div className="text posts">
            <span className="count">{postCount}</span>
            <span className="label">posts</span>
          </div>
          <div className="text pins">
            <span className="count">{pinCount}</span>
            <span className="label">pins</span>
          </div>
        </div>
        {showPostToEventBtn
          && <div
            className="post-to-event"
            onClick={() => {
              setEventOnLayout(event);
              setShowPostToEventSearchBar(false);
              setShowPostToEventModal(true);
            }}
          >
            <FontAwesome name="camera" />
          </div>
        }
      </div>
    );
  };

  const renderFooter = (startAt, endAt) => {
    const { eventCard: { footerLabels } } = lang;
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
    <LayoutContext.Consumer>
      {({ setShowPostToEventModal, setEvent: setEventOnLayout, setShowPostToEventSearchBar }) => (
        <div id={'event-card'}
          className={`event-card ${props.smallCard ? SMALL_CARD_CLASS : ''}`}
        >
          <div className="event-card__content">
            {renderTitle()}
            {props.showCompetitions && renderCompetitions(event.competitions)}
            {renderStats(setShowPostToEventModal, setEventOnLayout, setShowPostToEventSearchBar)}
          </div>
          {renderFooter(event.start_at, event.end_at)}
        </div>
      )}
    </LayoutContext.Consumer>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    competitions: PropTypes.array.isRequired,
    start_at: PropTypes.string.isRequired,
    end_at: PropTypes.string.isRequired,
    user_pins: PropTypes.bool.isRequired,
    total_posts: PropTypes.number.isRequired,
    total_pins: PropTypes.number.isRequired,
  }).isRequired,
  handlePin: PropTypes.func.isRequired,
  showCompetitions: PropTypes.bool,
  smallCard: PropTypes.bool,
};

EventCard.defaultProps = {
  showCompetitions: true,
  smallCard: false,
};

export default EventCard;
