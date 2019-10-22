import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import WinnersSection from '../../components/WinnersSection';
import Button from '../../components/Button';
import Loader from '../../components/Loader/index';
import lang from '../../helpers/en.default';
import './EventWinners.scss';

export const EventWinners = ({
  winners, isLoading, handleGenerateWinners, getWinnerIsLoading,
  event, user,
}) => {
  const isEventDone = moment().isAfter(event.end_at);
  const isEventStarted = moment().isAfter(event.start_at);
  const renderCompetitionWinners = (returnedWinnersSections) => (
    <div>
      {returnedWinnersSections
        .map((returnedWinnersSection, i) => (
          <div key={i} className="competition">
            <WinnersSection winnersSection={returnedWinnersSection} />
          </div>
        ))}
    </div>
  );

  const displayGenerateButton = () => {
    if (event.user_id !== user.userData.id) {
      return false;
    }
    if (winners.length > 0 && winners[0].winners_generated) {
      return false;
    }
    return true;
  };

  const renderEventOngoing = () => (
    <div className="eventwinners">
      <div className="eventwinners__info">
        {lang.eventPage.eventOngoing}
      </div>
    </div>
  );

  const renderEventNotStarted = () => (
    <div className="eventwinners">
      <div className="eventwinners__info">
        {lang.eventPage.eventNotStarted}
      </div>
    </div>
  );

  const renderWinners = () => (
    <div className="eventwinners">
      {displayGenerateButton() && <div className="buttonContainer">
        <Button
          title="Generate Winners"
          buttonType="button"
          disabled={isLoading}
          showLoader={isLoading}
          handleClick={handleGenerateWinners}
        />
      </div>}
      <div>
        {getWinnerIsLoading
            && <Loader
              containerClassName="winner-loader" message="Getting winners... Hang tight!." />}
        {!getWinnerIsLoading && renderCompetitionWinners(winners)}
      </div>
    </div>
  );

  return (
    <Fragment>
      {isEventDone && renderWinners()}
      {(!isEventStarted && !isEventDone) && renderEventNotStarted()}
      {(isEventStarted && !isEventDone) && renderEventOngoing()}
    </Fragment>
  );
};

EventWinners.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  winners: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getWinnerIsLoading: PropTypes.bool.isRequired,
  handleGenerateWinners: PropTypes.func.isRequired,
};

export default EventWinners;
