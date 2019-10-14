import React, {
  useState, useEffect,
  useRef, Fragment,
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
import * as eventPostActions from '../../redux/actionCreators/eventPostActions';
import { createFormData } from '../../helpers/utils';
import { searchScopes, maxBestCaptionLength } from '../../helpers/defaults';

const BEST_CAPTION_ID = process.env.REACT_APP_BEST_CAPTION_COMPETITION_ID;
let HIGH = '';

const PostToEvent = (props) => {
  const { event, showSearchBar } = props;
  const [selectedCompetitionId, setSelectedCompetitionId] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(event || null);
  const [eventCompetitions, setEventCompetitions] = useState([]);
  const [isBestCaptionCompetition, setIsBestCaptionCompetition] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const [caption, setCaption] = useState('');
  const [topCaption, setTopCaption] = useState('');
  const [bottomCaption, setBottomCaption] = useState('');
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
    if (selectedCompetitionId === BEST_CAPTION_ID.toString()) {
      setIsBestCaptionCompetition(true);
      HIGH = 'high';
    } else {
      setIsBestCaptionCompetition(false);
      setTopCaption('');
      setBottomCaption('');
      HIGH = '';
    }
  }, [selectedCompetitionId]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let disableBtn = !selectedEvent || !selectedCompetitionId || !imageFile || isPostingToEvent;

      if (isBestCaptionCompetition && !disableBtn) {
        disableBtn = !topCaption && !bottomCaption;
      }

      setDisableFormBtn(disableBtn);
    }
  }, [selectedEvent, selectedCompetitionId, topCaption,
    imageFile, isPostingToEvent, bottomCaption,
    isBestCaptionCompetition,
  ]);

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
    setSelectedCompetitionId(value);
  };

  const handleImageChange = (image) => {
    setImageFile(image);
  };

  const handleCaptionChange = (eventObject) => {
    const { value, name } = eventObject.currentTarget;
    if (name === 'topCaption') {
      setTopCaption(value);
    } else if (name === 'bottomCaption') {
      setBottomCaption(value);
    } else {
      setCaption(value);
    }
  };

  const handleFormSubmit = () => {
    if (!disableFormBtn) {
      const payload = createFormData({
        caption,
        image: imageFile,
        competitionId: selectedCompetitionId,
        topCaption,
        bottomCaption,
      });

      postToEvent(selectedEvent.id, payload);
    }
  };

  const handleRemoveSelectedEvent = (eventId) => {
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(null);
      setEventCompetitions([]);
      setSelectedCompetitionId('');
      setTopCaption('');
      setBottomCaption('');
    }
  };

  const renderCaptionInputs = () => (
    <Fragment>
      {isBestCaptionCompetition
        && <Fragment>
          <CustomTextarea
            placeholder={lang.postToEvent.topCaptionPlaceholder}
            styles={{ fontWeight: '600', height: '40px' }}
            name="topCaption"
            onChange={handleCaptionChange}
            value={topCaption}
            maxLength={maxBestCaptionLength}
            error=""
          />
          <CustomTextarea
            placeholder={lang.postToEvent.bottomCaptionPlaceholder}
            styles={{ fontWeight: '600', height: '40px' }}
            name="bottomCaption"
            onChange={handleCaptionChange}
            value={bottomCaption}
            maxLength={maxBestCaptionLength}
            error=""
          />
        </Fragment>
      }
      <CustomTextarea
        placeholder={lang.postToEvent.captionPlaceholder}
        styles={{ fontWeight: '600' }}
        name="caption"
        onChange={handleCaptionChange}
        value={caption}
        error=""
      />
    </Fragment>
  );

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
            value={selectedCompetitionId}
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
            topCaptionText={topCaption}
            bottomCaptionText={bottomCaption}
          />
        </div>
        <div className="caption">{renderCaptionInputs()}</div>
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
      <div className={`post-to-event__container ${HIGH}`}>
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