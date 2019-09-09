import React, {
  useState, useEffect, Fragment, useRef,
} from 'react';
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
import * as competitionActions from '../../redux/actionCreators/competitionActions';
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import Loader from '../Loader';
import { createFormData } from '../../helpers/utils';

const PostToEvent = (props) => {
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventCompetitions, setEventCompetitions] = useState([]);
  const [imageFile, setImageFile] = useState('');
  const [caption, setCaption] = useState('');
  const [disableFormBtn, setDisableFormBtn] = useState(true);
  const isInitialMount = useRef(true);
  const {
    competitions, competitionIsLoading, fetchAllCompetitions,
    competitionError, postToEvent, isPostingToEvent,
    eventPostSuccess, handleModalClose,
  } = props;

  useEffect(() => {
    if (isInitialMount.current) {
      fetchAllCompetitions();
      isInitialMount.current = false;
    }
  }, [fetchAllCompetitions]);

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
    } else if (selectedEvent && competitions.length) {
      const comp = competitions.filter((comptn) => selectedEvent.competitions.includes(comptn.id));
      setEventCompetitions(comp);
    }
  }, [selectedEvent, competitions]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const disableBtn = !selectedEvent || !selectedCompetition || !imageFile || isPostingToEvent;
      setDisableFormBtn(disableBtn);
    }
  }, [selectedEvent, selectedCompetition, imageFile, isPostingToEvent]);

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  const handleDropdownSelect = (event) => {
    const { value } = event.target;
    setSelectedCompetition(value);
  };

  const handleImageChange = (image) => {
    setImageFile(image);
  };

  const handleCaptionChange = (event) => {
    const { value } = event.target;
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

  const postToEventForm = () => {
    const dropdownInfo = selectedEvent
      ? lang.postToEvent.competitionDropdownInfo : lang.postToEvent.eventSearchInfo;

    return (
      <div className="form-content">
        <div className="search">
          <SearchBar
            searchScope="events"
            searchResultTitleProperty="hashtag"
            searchResultValueProperty="id"
            handleSearchResultClick={handleEventSelection}
            placeholder="search events here"
          />
        </div>
        {selectedEvent
          && <div className="event">
              <Capsule
                title={selectedEvent.hashtag}
                id={selectedEvent.id}
                handleClose={handleRemoveSelectedEvent}
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
            placeholder="select a competition"
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
            placeholder="enter caption"
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

  const renderPostToEventForm = () => (
    <Fragment>
      {competitionError
        ? <div className="error">{competitionError}</div>
        : postToEventForm()
      }
    </Fragment>
  );

  return (
    <div className="post-to-event" id="post-to-event">
      <div className="post-to-event__container">
        {competitionIsLoading
          ? <Loader containerClassName="post-to-event__loader" />
          : renderPostToEventForm()
        }
      </div>
    </div>
  );
};

PostToEvent.propTypes = {
  children: PropTypes.node,
  competitions: PropTypes.array.isRequired,
  competitionIsLoading: PropTypes.bool.isRequired,
  isPostingToEvent: PropTypes.bool.isRequired,
  fetchAllCompetitions: PropTypes.func.isRequired,
  postToEvent: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  competitionError: PropTypes.string.isRequired,
  eventPostSuccess: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ competition, eventPost }) => ({
  competitions: competition.competitions,
  competitionIsLoading: competition.isLoading,
  competitionError: competition.error.message,
  isPostingToEvent: eventPost.isLoading,
  eventPostSuccess: eventPost.success,
});

const actionCreators = {
  fetchAllCompetitions: competitionActions.fetchAllCompetitions,
  postToEvent: eventPostActions.postToEvent,
};

export default connect(mapStateToProps, actionCreators)(PostToEvent);
