import React from 'react';
import PropTypes from 'prop-types';

import './Settings.scss';
import lang from '../../helpers/en.default';
import { jwtKey } from '../../helpers/defaults';
import { history } from '../../helpers/utils';

const Settings = (props) => {
  const { handleCloseSettings } = props;

  const handleLogout = () => {
    localStorage.removeItem(jwtKey);
    history.push('/');
  };

  const renderContent = () => (
    <div className="up-settings__content">
      <div className="up-settings__content-item" onClick={handleLogout}>
        <span className="text">{lang.settings.logoutText}</span>
      </div>
      <div className="up-settings__content-item" onClick={handleCloseSettings}>
        <span className="text">{lang.settings.cancelText}</span>
      </div>
    </div>
  );

  return (
    <div className={'up-settings'}>
      {renderContent()}
    </div>
  );
};

Settings.propTypes = {
  handleCloseSettings: PropTypes.func.isRequired,
};

export default Settings;
