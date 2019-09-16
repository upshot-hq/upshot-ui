import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './PostToEvent.scss';
import lang from '../../helpers/en.default';
import Button from '../Button';
import CustomTextarea from '../FormInput/CustomTextarea';
import Dropdown from '../FormInput/Dropdown';
import Capsule from '../Capsule';
import SearchBar from '../SearchBar';
import ImageUpload from '../ImageUpload/index';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import { createFormData } from '../../helpers/utils';
import { searchScopes } from '../../helpers/defaults';

const PostToEvent = (props) => {
  const { event, showSearchBar } = props;
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(event || null);
  const [eventCompetitions, setEventCompetitions] = useState([]);
  const [imageFile, setImageFile] = useState('');
  const [caption, setCaption] = useState('');
  const [disableFormBtn, setDisableFormBtn] = useState(true);
  const isInitialMount = useRef(true);
  const {
    postToEvent, isPostingToEvent,
    eventPostSuccess, handleModalClose, showEventRemoveBtn,
  } = props;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (eventPostSuccess) {
      handleModalClose();
    }
  }, [handleModalClose, eventPostSuccess]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (selectedEvent) {
      const { competitions } = selectedEvent;
      setEventCompetitions(competitions);
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const disableBtn = !selectedEvent || !selectedCompetition || !imageFile || isPostingToEvent;
      setDisableFormBtn(disableBtn);
    }
  }, [selectedEvent, selectedCompetition, imageFile, isPostingToEvent]);

  const getSearchResultTitleAndValue = (resultItem) => {
    const titleAndValue = { title: '', value: '', type: '' };
    const isEvent = ('start_at' in resultItem);

    if (isEvent) {
      titleAndValue.title = resultItem.hashtag;
      titleAndValue.value = resultItem.id;
    }

    return titleAndValue;
  };

  const handleEventSelection = (eventObject) => {
    setSelectedEvent(eventObject);
  };

  const handleDropdownSelect = (eventObject) => {
    const { value } = eventObject.target;
    setSelectedCompetition(value);
  };

  const handleImageChange = (image) => {
    setImageFile(image);
  };

  const handleCaptionChange = (eventObject) => {
    const { value } = eventObject.target;
    setCaption(value);
  };

  const handleFormSubmit = () => {
    if (!disableFormBtn) {
      const payload = createFormData({
        caption,
        image: imageFile,
        competitionId: selectedCompetition,
      });

      postToEvent(selectedEvent.id, payload);
    }
  };

  const handleRemoveSelectedEvent = (eventId) => {
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(null);
    }
  };

  const renderPostToEventForm = () => {
    const dropdownInfo = selectedEvent
      ? lang.postToEvent.competitionDropdownInfo : lang.postToEvent.eventSearchInfo;

    return (
      <div className="form-content">
        {showSearchBar
          && <div className="search">
            <SearchBar
              searchScope={searchScopes.events}
              getSearchResultTitleAndValue={getSearchResultTitleAndValue}
              handleSearchResultClick={handleEventSelection}
              placeholder={lang.postToEvent.searchPlaceholder}
              strictSearch
            />
          </div>
        }
        {selectedEvent
          && <div className="event">
              <Capsule
                title={selectedEvent.hashtag}
                id={selectedEvent.id}
                handleClose={handleRemoveSelectedEvent}
                showCloseBtn={showEventRemoveBtn}
              />
          </div>
        }
        <div className="competitions">
          <Dropdown
            name="competition"
            options={eventCompetitions}
            optionsTitleProperty="name"
            optionsValueProperty="id"
            value={selectedCompetition}
            error=""
            info={dropdownInfo}
            onChange={handleDropdownSelect}
            placeholder={lang.postToEvent.dropdownPlaceholder}
            disabled={!selectedEvent}
          />
        </div>
        <div className="post-image">
          <ImageUpload
            handleImageFileChange={handleImageChange}
            containerStyles={{
              width: '100%',
              height: '216px',
              borderRadius: '5px',
              border: 'none',
            }}
            inputStyles={{ height: '100%' }}
            iconStyles={{ top: '43%', left: '43%' }}
          />
        </div>
        <div className="caption">
          <CustomTextarea
            placeholder={lang.postToEvent.captionPlaceholder}
            styles={{ fontWeight: '600' }}
            name="caption"
            onChange={handleCaptionChange}
            value={caption}
            error=""
          />
        </div>
        <div className="form-button">
          <Button
            handleClick={handleFormSubmit}
            title="post"
            customStyles={{ height: '42px', width: '122px' }}
            disabled={disableFormBtn}
            showLoader={isPostingToEvent}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="post-to-event" id="post-to-event">
      <div className="post-to-event__container">
        {renderPostToEventForm()}
      </div>
    </div>
  );
};

PostToEvent.propTypes = {
  children: PropTypes.node,
  isPostingToEvent: PropTypes.bool.isRequired,
  postToEvent: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  eventPostSuccess: PropTypes.bool.isRequired,
  showSearchBar: PropTypes.bool,
  showEventRemoveBtn: PropTypes.bool,
  event: PropTypes.shape({
    competitions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      name: PropTypes.string.isRequired,
    })),
  }),
};

PostToEvent.defaultProps = {
  showSearchBar: true,
  showEventRemoveBtn: true,
};

const mapStateToProps = ({ eventPost }) => ({
  isPostingToEvent: eventPost.isLoading,
  eventPostSuccess: eventPost.success,
});

const actionCreators = {
  postToEvent: eventPostActions.postToEvent,
};

export default connect(mapStateToProps, actionCreators)(PostToEvent);
