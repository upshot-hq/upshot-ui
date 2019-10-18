import React from 'react';
import PropTypes from 'prop-types';
import WinnerCard from '../WinnerCard';
import Accordion from '../Accordion';
import lang from '../../helpers/en.default';
import './WinnersSection.scss';

const WinnersSection = ({
  winnersSection,
}) => (
  <Accordion title={winnersSection.competition_name}>
    <div id="winners-section">
      <div className="winners">
        {(winnersSection.winners.length === 0) && <div className="no-winners">
          <span>{lang.winnersPage.noWinner}</span>
        </div>}
        {winnersSection.winners.map((winner, i) => <WinnerCard key={i} winner={winner} />)}
      </div>
    </div>
  </Accordion>
);

WinnersSection.propTypes = {
  winnersSection: PropTypes.object.isRequired,
};

export default WinnersSection;
