import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import './CompetitionFilter.scss';
import Capsule from '../Capsule';

const CompetitionFilter = (props) => {
  const { competitions, handleFilterSelect, selectedCompetitionId } = props;

  const handleCompetitionSelect = (competition) => {
    handleFilterSelect(competition.id);
  };

  const renderCompetition = (competition, index) => {
    const capsuleClassName = selectedCompetitionId === competition.id
      ? 'filter-capsule active' : 'filter-capsule';

    return (
        <Capsule
          title={competition.name}
          id={competition.id}
          key={index}
          showCloseBtn={false}
          handleClose={() => {}}
          handleSelect={() => handleCompetitionSelect(competition)}
          capsuleClassName={capsuleClassName}
          textClassName="filter-capsule-text"
        />
    );
  };

  const renderFilter = () => (
    <div className="us-competition-filter">
      <div className="us-competition-filter__content">
        <div className="icon">
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <div className="competitions">
          <Capsule
            title="all"
            id=""
            showCloseBtn={false}
            handleClose={() => {}}
            handleSelect={() => handleCompetitionSelect({ id: '' })}
            capsuleClassName={!selectedCompetitionId
              ? 'filter-capsule all active' : 'filter-capsule all'}
            textClassName="filter-capsule-text"
          />
          {competitions.map((competition, index) => renderCompetition(competition, index))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="" id="us-competition-filter">
      {renderFilter()}
    </div>
  );
};

CompetitionFilter.propTypes = {
  competitions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleFilterSelect: PropTypes.func.isRequired,
  selectedCompetitionId: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  ).isRequired,
};

export default CompetitionFilter;
