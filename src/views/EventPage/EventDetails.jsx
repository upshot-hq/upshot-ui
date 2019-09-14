import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import lang from '../../helpers/en.default';
import { addStylesToHashTags } from '../../helpers/utils';

export const EventDetails = (props) => {
  const { eventPage: { details } } = lang;
  const { event } = props;

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

  const renderHashtagCard = () => (
		<div className="details-card">
			<div className="details-card__header">
				<p className="text">{details.hashtags}</p>
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

  const renderDateAndTimeCard = () => {
    const startAt = moment(event.start_at).format('LLLL');
    const endAt = moment(event.end_at).format('LLLL');

    return (
			<div className="details-card">
				<div className="details-card__header">
					<p className="text">{details.dateAndTime}</p>
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
				<p className="text">{details.contact}</p>
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

  const renderDetailsCards = () => (
		<Fragment>
			{renderAboutCard()}
			{renderHashtagCard()}
			{renderDateAndTimeCard()}
			{renderContactCard()}
		</Fragment>
  );

  return (
		<Fragment>
			{renderDetailsCards()}
		</Fragment>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    user_firstname: PropTypes.string.isRequired,
    user_lastname: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    hashtag: PropTypes.string.isRequired,
    start_at: PropTypes.string.isRequired,
    end_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventDetails;
