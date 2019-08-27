import React, { useState } from 'react';
import { Textbox, MultiSelector, Textarea } from '../FormInput';
import Button from '../Button';
import { validateGettingStarted, validateAlmostThere } from '../../validators/validateCreateEvent';
import './style.scss';

const options = [
  {
    id: 1,
    name: 'Best dressed',
  },
  {
    id: 2,
    name: 'Best angle',
  },
  {
    id: 3,
    name: 'Funniest caption',
  },
];

const pages = {
  gettingStarted: 1,
  almostThere: 2,
  lastThing: 3,
};

const CreateEvent = () => {
  const [inputs, setInputs] = useState({ competitions: [], about: '', errors: {} });
  const [currentPage, setCurrentPage] = useState(3);

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

    handleChange(event);
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
    // page A
    if (page === pages.gettingStarted) {
      const { isValid, errors } = validateGettingStarted(inputs);
      console.log('errors: ', errors);
      setInputs({ ...inputs, errors });
      if (isValid) {
        setCurrentPage(pages.almostThere);
      }
    }

    // page B
    if (page === pages.almostThere) {
      const { isValid, errors } = validateAlmostThere(inputs);
      console.log('errors: ', errors);
      setInputs({ ...inputs, errors });
      if (isValid) {
        setCurrentPage(pages.lastThing);
      }
    }

    // page C
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
          <MultiSelector options={options} selectedOptions={inputs.competitions}
          handleSelect={handleSelect}
          info="select competitions users can enter for" error={inputs.errors.competitions} />
        </div>
      </div>
      <Button title="continue" handleClick={() => (handleSubmit(pages.gettingStarted))} />
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
    </div>
  );

  const renderLastThing = () => (
    <div>
      <p className="create-event__title">One last thing</p>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <Textbox id="startDate" value={inputs.startDate} name="startDate"
          title="startDate" placeholder="start date and time"
          type="datetime-local" onChange={handleChange}
          info="select the date and time the event will commence"
          error={inputs.errors.startDate} required />
        </div>
        <div className="create-event__form-input">
          <Textbox id="endDate" value={inputs.endDate} name="endDate"
          title="endDate" placeholder="end date and time" type="datetime-local"
          onChange={handleChange}
          info="select the date and time the event will end"
          error={inputs.errors.endDate} required />
        </div>
      </div>
      <br/>
      <span className="info">this helps us know when to allow upshotters upload images</span>
      <br/>
      <br/>
      <div className="buttons">
        <Button title="finish" handleClick={() => (handleSubmit(pages.lastThing))} />
        <span onClick={() => goBack(pages.almostThere)} className="go-back">go back</span>
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

export default CreateEvent;
