import React, {
  Fragment, useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import './EventPage.scss';
import Layout from '../../components/Layout';
import lang from '../../helpers/en.default';
import Tabs from '../../components/Tabs';
import EventCard from '../../components/EventCard';
import Loader from '../../components/Loader';
import * as eventActions from '../../redux/actionCreators/eventActions';
import { addStylesToHashTags } from '../../helpers/utils';

export const EventPage = (props) => {
  const { detailsTab, postsTab, analyticsTab } = lang.eventPage.tabs;
  const {
    match: { params }, event,
    getEvent, eventIsLoading,
  } = props;
  const [currentView, setCurrentView] = useState(detailsTab);
  const isInitialMount = useRef(true);
  const tabItems = [
    {
      title: detailsTab,
      onClick: () => setCurrentView(detailsTab),

    },
    {
      title: postsTab,
      onClick: () => setCurrentView(postsTab),

    },
    {
      title: analyticsTab,
      onClick: () => setCurrentView(analyticsTab),
    },
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      const { eventId } = params;
      getEvent(eventId);
      isInitialMount.current = false;
    }
  }, [params, getEvent]);

  const renderEventCard = (eventItem) => (<EventCard event={eventItem} />);

  const renderAboutCard = () => (
		<div className="details-card">
			<div className="details-card__header">
				<p className="text">{lang.eventPage.details.about}</p>
			</div>
			<div className="details-card__content">
				<p className="text"
					// eslint-disable-next-line
					dangerouslySetInnerHTML={
						{ __html: addStylesToHashTags(event.about) }
					}
				/>
			</div>
		</div>
  );

  const renderDateAndTimeCard = () => {
    const startAt = moment(event.start_at).format('LLLL');
    const endAt = moment(event.end_at).format('LLLL');

    return (
			<div className="details-card">
				<div className="details-card__header">
					<p className="text">{lang.eventPage.details.dateAndTime}</p>
				</div>
				<div className="details-card__content">
					<div className="start">
						<div className="text title">start:</div>
						<div className="text">{startAt}</div>
					</div>
					<div className="end">
						<div className="text title">end:</div>
						<div className="text">{endAt}</div>
					</div>
				</div>
			</div>
    );
  };

  const renderContactCard = () => (
		<div className="details-card">
			<div className="details-card__header">
				<p className="text">{lang.eventPage.details.contact}</p>
			</div>
			<div className="details-card__content">
				<div className="start">
					<div className="text title">name:</div>
					<div className="text capitalize">
						{`${event.user_firstname} ${event.user_lastname}`}
					</div>
				</div>
				<div className="end">
					<div className="text title">email:</div>
					<div className="text">{event.user_email}</div>
				</div>
			</div>
		</div>
  );

  const renderHashtagCard = () => (
		<div className="details-card">
			<div className="details-card__header">
				<p className="text">{lang.eventPage.details.hashtags}</p>
			</div>
			<div className="details-card__content">
				<p className="text"
					// eslint-disable-next-line
					dangerouslySetInnerHTML={
						{ __html: addStylesToHashTags(event.hashtag) }
					}
				/>
			</div>
		</div>
  );

  const renderDetailsCards = () => (
		<Fragment>
			{renderAboutCard()}
			{renderHashtagCard()}
			{renderDateAndTimeCard()}
			{renderContactCard()}
		</Fragment>
  );

  const renderView = () => (
		<Fragment>
			<div className="eventpage__header">
				<div className="eventpage__header-top">
					<div className="eventpage__header-top__content">
						{renderEventCard(event)}
					</div>
				</div>
				<div className="eventpage__header-bottom">
					<Tabs navItems={tabItems} activeTitle={currentView} />
				</div>
			</div>
			<div className="eventpage__content">
				<div className="eventpage__content-container">
					{(currentView === detailsTab) && renderDetailsCards()}
				</div>
			</div>
		</Fragment>
  );

  const renderLoader = () => (
		<div className="eventpage__loader-container">
			<Loader containerClassName="eventpage__loader-container--loader" />
		</div>
  );

  const renderNotFound = () => (
		<div className="eventpage__notfound">
			<div className="text">{lang.eventPage.notFound}</div>
		</div>
  );

  return (
		<Fragment>
			<Layout centerContainerStyles={{ paddingTop: 0 }}>
				<div className="eventpage" id="eventpage">
					{eventIsLoading && renderLoader()}
					{!eventIsLoading && event.id && renderView()}
					{!eventIsLoading && !event.id && renderNotFound()}
				</div>
			</Layout>
		</Fragment>
  );
};

EventPage.propTypes = {
  match: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  eventIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ event }) => ({
  event: event.event,
  eventIsLoading: event.isLoadingEvent,
});

const actionCreators = {
  getEvent: eventActions.getEvent,
};

export default connect(mapStateToProps, actionCreators)(EventPage);
