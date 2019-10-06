import React from 'react';
import PropTypes from 'prop-types';
import WinnersSection from '../../components/WinnersSection';
import Button from '../../components/Button';
import Loader from '../../components/Loader/index';
import './EventWinners.scss';

export const EventWinners = ({
  winners, isLoading, handleGenerateWinners, getWinnerIsLoading,
}) => {
  const renderCompetitionWinners = (returnedWinnersSections) => {
    return (
      <div>
        {returnedWinnersSections
          .map((returnedWinnersSection, i) => {
            const isOpen = (i === 0);
            return (
              <div key={i} className="competition">
                <WinnersSection isOpen={isOpen} winnersSection={returnedWinnersSection} />
              </div>
            );
          })}
      </div>
    );
  };

  const displayGenerateButton = () => {
    if (winners.length > 0 && winners[0].winners_generated) {
      return false;
    }
    return true;
  };

  return (
    <div className="eventwinners">
      {displayGenerateButton() && <div className="buttonContainer">
        {/* check winners.length and winners.winners.length */}
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
};

EventWinners.propTypes = {
  winners: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getWinnerIsLoading: PropTypes.bool.isRequired,
  handleGenerateWinners: PropTypes.func.isRequired,
};

export default EventWinners;
