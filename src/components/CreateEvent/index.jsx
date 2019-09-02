import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Textbox, MultiSelector, Textarea, DatePicker,
} from '../FormInput';
import Button from '../Button';
import {
  validateGettingStarted,
  validateAlmostThere,
  validateLastThing,
} from '../../validators/validateCreateEvent';
import * as competitionActions from '../../redux/actionCreators/competitionActions';
import * as eventActions from '../../redux/actionCreators/eventActions';
import Loader from '../Loader';
import './style.scss';

const pages = {
  gettingStarted: 1,
  almostThere: 2,
  lastThing: 3,
};

const GettingStartedBar = () => (
  <svg width="221" height="12" viewBox="0 0 221 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M111 6H210V7H111V6Z" fill="#C4C4C4"/>
  <path d="M11 6H110V7H11V6Z" fill="#2D283E"/>
  <path d="M221 6C221 9.31371 218.09 12 214.5 12C210.91 12 208 9.31371
  208 6C208 2.68629 210.91 0 214.5 0C218.09 0 221 2.68629 221 6Z" fill="#C4C4C4"/>
  <path d="M117 6C117 9.31371 114.09 12 110.5 12C106.91 12 104 9.31371
  104 6C104 2.68629 106.91 0 110.5 0C114.09 0 117 2.68629 117 6Z" fill="#C4C4C4"/>
  <path d="M13 6C13 9.31371 10.0899 12 6.5 12C2.91015 12 0 9.31371
  0 6C0 2.68629 2.91015 0 6.5 0C10.0899 0 13 2.68629 13 6Z" fill="#2D283E"/>
  </svg>
);

const AlmostThereBar = () => (
  <svg width="221" height="12" viewBox="0 0 221 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M111 6H210V7H111V6Z" fill="#2D283E"/>
  <path d="M11 6H110V7H11V6Z" fill="#2D283E"/>
  <path d="M221 6C221 9.31371 218.09 12 214.5 12C210.91 12 208 9.31371
  208 6C208 2.68629 210.91 0 214.5 0C218.09 0 221 2.68629 221 6Z" fill="#C4C4C4"/>
  <path d="M117 6C117 9.31371 114.09 12 110.5 12C106.91 12 104 9.31371
  104 6C104 2.68629 106.91 0 110.5 0C114.09 0 117 2.68629 117 6Z" fill="#2D283E"/>
  <path d="M13 6C13 9.31371 10.0899 12 6.5 12C2.91015 12 0 9.31371
  0 6C0 2.68629 2.91015 0 6.5 0C10.0899 0 13 2.68629 13 6Z" fill="#2D283E"/>
  </svg>
);

const LastThingBar = () => (
  <svg width="221" height="12" viewBox="0 0 221 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M111 6H210V7H111V6Z" fill="#2D283E"/>
  <path d="M11 6H110V7H11V6Z" fill="#2D283E"/>
  <path d="M221 6C221 9.31371 218.09 12 214.5 12C210.91 12 208
  9.31371 208 6C208 2.68629 210.91 0 214.5 0C218.09 0 221 2.68629 221 6Z" fill="#2D283E"/>
  <path d="M117 6C117 9.31371 114.09 12 110.5 12C106.91 12 104
  9.31371 104 6C104 2.68629 106.91 0 110.5 0C114.09 0 117 2.68629 117 6Z" fill="#2D283E"/>
  <path d="M13 6C13 9.31371 10.0899 12 6.5 12C2.91015 12 0 9.31371
  0 6C0 2.68629 2.91015 0 6.5 0C10.0899 0 13 2.68629 13 6Z" fill="#2D283E"/>
  </svg>
);

const CreateEvent = (props) => {
  const {
    isCompetitionsLoading,
    competitions,
    getCompetitions,
    isEventLoading,
    createEvent,
    createEventError,
    handleModalClose,
  } = props;
  const [inputs, setInputs] = useState({
    competitions: [],
    about: '',
    startDate: new Date(),
    endDate: new Date(),
    errors: {},
    competitionList: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const formSubmitted = useRef(false);

  useEffect(() => {
    getCompetitions();
  }, []);

  useEffect(() => {
    const formattedCompetitions = competitions.map((competition) => ({
      id: competition.id,
      name: competition.name,
    }));
    setInputs({ ...inputs, competitionList: formattedCompetitions });
  }, [competitions]);

  useEffect(() => {
    // update error state if there's error from server
    if (Object.keys(createEventError.errors).length) {
      const serverErrors = {
        ...createEventError.errors,
        startDate: createEventError.errors.start_time,
        endDate: createEventError.errors.end_time,
      };
      setInputs({ ...inputs, errors: serverErrors });
      // set error page to display
      if (serverErrors.hashtag || serverErrors.competitions) {
        setCurrentPage(1);
      } else if (serverErrors.name || serverErrors.about) {
        setCurrentPage(2);
      } else if (serverErrors.startDate || serverErrors.endDate) {
        setCurrentPage(3);
      }
      formSubmitted.current = false;
    }
    if (!Object.keys(createEventError.errors).length && formSubmitted.current) {
      handleModalClose();
      formSubmitted.current = false;
    }
  }, [createEventError]);

  const handleChange = (event) => {
    event.persist();
    setInputs((prevInputs) => ({ ...prevInputs, [event.target.name]: event.target.value }));
  };

  const handleQuillChange = (content, delta, source, editor) => {
    const text = editor.getText(content);
    const event = {
      persist: () => {},
      target: {
        name: 'about',
        value: content,
      },
    };
    const eventText = {
      persist: () => {},
      target: {
        name: 'aboutText',
        value: text,
      },
    };

    handleChange(event);
    handleChange(eventText);
  };

  const handleSelect = (event) => {
    const { id } = event.target;
    let newSelectedOptions = [];
    const optionAlreadySelected = inputs.competitions.find((option) => (option === id));
    if (optionAlreadySelected) {
      // remove option from list
      newSelectedOptions = inputs.competitions.filter((option) => (option !== id));
    } else {
      newSelectedOptions = [...inputs.competitions, id];
    }

    setInputs({ ...inputs, competitions: newSelectedOptions });
  };

  const handleSubmit = (page) => {
    if (page === pages.gettingStarted) {
      const { isValid, errors } = validateGettingStarted(inputs);
      setInputs({ ...inputs, errors: { ...inputs.errors, ...errors } });
      if (isValid) {
        setCurrentPage(pages.almostThere);
      }
    }

    if (page === pages.almostThere) {
      const { isValid, errors } = validateAlmostThere(inputs);
      setInputs({ ...inputs, errors: { ...inputs.errors, ...errors } });
      if (isValid) {
        setCurrentPage(pages.lastThing);
      }
    }

    if (page === pages.lastThing) {
      const { isValid, errors } = validateLastThing(inputs);
      setInputs({ ...inputs, errors: { ...inputs.errors, ...errors } });
      if (isValid) {
        const requestBody = {
          name: inputs.name,
          hashtag: inputs.hashtag,
          about: inputs.about,
          competitions: inputs.competitions.map((competition) => (Number(competition))),
          start_time: inputs.startDate,
          end_time: inputs.endDate,
        };

        createEvent(requestBody);
        formSubmitted.current = true;
      }
    }
  };

  const goBack = (page) => {
    setCurrentPage(page);
  };

  const renderGetStarted = () => (
    <div>
      <p className="create-event__title">Let's get started</p>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <Textbox id="hashtag" value={inputs.hashtag || ''} name="hashtag"
          title="hashtag" placeholder="#hashtag" type="text" onChange={handleChange}
          info="the hashtag you'd like to use for the event"
          error={inputs.errors.hashtag || ''} required />
        </div>
        <div className="create-event__form-input">
          {isCompetitionsLoading && <div><Loader message="loading competitions..." /> </div>}
          {!isCompetitionsLoading
          && <MultiSelector options={inputs.competitionList} selectedOptions={inputs.competitions}
          handleSelect={handleSelect}
          info="select competitions users can enter for" error={inputs.errors.competitions} />}
        </div>
      </div>
      <Button title="continue"
        handleClick={() => (handleSubmit(pages.gettingStarted))}
        customStyles={{ marginTop: '20px' }} />
      <div className="progress-bar">
        <GettingStartedBar />
      </div>
    </div>
  );

  const renderAlmostThere = () => (
    <div>
      <p className="create-event__title">Almost there, tell us more :)</p>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <Textbox id="name" value={inputs.name || ''} name="name"
          title="name" placeholder="event name" type="text" onChange={handleChange}
          info="the name your event will be called"
          error={inputs.errors.name || ''} required />
        </div>
        <div className="create-event__form-input">
          <Textarea name="about" value={inputs.about}
          onChange={handleQuillChange} placeholder="about..."
          info="give us more infomation about your event"
          error={inputs.errors.about} required />
        </div>
      </div>
      <div className="buttons">
        <Button title="continue" handleClick={() => (handleSubmit(pages.almostThere))} />
        <span onClick={() => goBack(pages.gettingStarted)} className="go-back">go back</span>
      </div>
      <div className="progress-bar">
        <AlmostThereBar />
      </div>
    </div>
  );

  const renderLastThing = () => (
    <div>
      <p className="create-event__title">One last thing</p>
      <br/><br/>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <DatePicker id="startDate" value={inputs.startDate} name="startDate"
          title="startDate" placeholder="start date and time" onChange={handleChange}
          info="select the date and time the event will start"
          error={inputs.errors.startDate} required />
        </div>
        <div className="create-event__form-input">
          <DatePicker id="endDate" value={inputs.endDate} name="endDate"
          title="endDate" placeholder="end date and time" onChange={handleChange}
          info="select the date and time the event will end"
          error={inputs.errors.endDate} required />
        </div>
      </div>
      <br/>
      <span className="last-thing-info">
        this helps us know when to allow upshotters upload images
      </span>
      <br/>
      <br/>
      {isEventLoading && <div><Loader message="creating event..." /> </div>}
      {!isEventLoading && <div className="buttons">
        <Button title="finish" handleClick={() => (handleSubmit(pages.lastThing))} />
        <span onClick={() => goBack(pages.almostThere)} className="go-back">go back</span>
      </div>}
      <div className="progress-bar">
        <LastThingBar />
      </div>
    </div>
  );

  const renderPage = () => {
    if (currentPage === 1) return renderGetStarted();
    if (currentPage === 2) return renderAlmostThere();
    if (currentPage === 3) return renderLastThing();
    return renderGetStarted();
  };

  return (
    <div className="create-event">
      {renderPage()}
    </div>
  );
};

CreateEvent.propTypes = {
  competitions: PropTypes.array.isRequired,
  isCompetitionsLoading: PropTypes.bool.isRequired,
  getCompetitions: PropTypes.func.isRequired,
  isEventLoading: PropTypes.bool.isRequired,
  createEvent: PropTypes.func.isRequired,
  createEventError: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ competitions, event }) => ({
  isCompetitionsLoading: competitions.isLoading,
  competitions: competitions.competitions,
  isEventLoading: event.isLoading,
  createEventError: event.errors,
});

const mapDispatchToProps = {
  getCompetitions: competitionActions.getCompetitions,
  createEvent: eventActions.createEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
