import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowBack } from '@material-ui/icons';

import './PageTitle.scss';
import { history } from '../../helpers/utils';
import { rearrangedString } from '../../helpers/defaults';

const PageTitle = (props) => {
  const { showBackBtn, title } = props;
  const rearranged = useRef('');

  useEffect(() => {
    if (!rearranged.current && !showBackBtn) {
      rearranged.current = rearrangedString;
    }
  }, [rearranged, showBackBtn]);

  const handleBackBtnClick = () => {
    history.goBack();
  };

  const renderContent = () => (
    <Fragment>
      {showBackBtn && <div
        className={`icon back-btn ${rearranged.current}`}
        onClick={handleBackBtnClick}
      >
        <ArrowBack />
      </div>
      }
      <div className={`title ${rearranged.current}`}>
        {title}
      </div>
    </Fragment>
  );

  return (
    <div className={`page-title ${rearranged.current}`} id="us-page-title">
      {renderContent()}
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  showBackBtn: PropTypes.bool,
};

PageTitle.defaultProps = {
  showBackBtn: true,
};

export default PageTitle;
