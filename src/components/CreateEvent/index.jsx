import React, { useState } from 'react';
import { Textbox, MultiSelector, Textarea } from '../FormInput';
import Button from '../Button';
import { validateCreateEventA } from '../../validators/validateCreateEvent';
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

const CreateEvent = () => {
  const [inputs, setInputs] = useState({ competitions: [], errors: {} });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);

  const handleChange = (event) => {
    event.persist();
    setInputs((prevInputs) => ({ ...prevInputs, [event.target.name]: event.target.value }));
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

  const handleSubmit = (formStep) => {
    // page A
    if (formStep === 1) {
      const { isValid, errors } = validateCreateEventA(inputs);
      console.log('errors: ', errors);
      setInputs({ ...inputs, errors });
      if (isValid) {
        setCurrentPage(2);
      }
    }

    // page B

    // page C
  }

  const renderGetStarted = () => (
    <div>
      <p className="create-event__title">Let's get started</p>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <Textbox id="hashtag" value={inputs.hashtag} name="hashtag"
          title="hashtag" placeholder="#hashtag" type="text" onChange={handleChange}
          info="the hashtag you'd like to use for the event"
          error={inputs.errors.hashtag} required />
        </div>
        <div className="create-event__form-input">
          <MultiSelector options={options} selectedOptions={inputs.competitions}
          handleSelect={handleSelect} info="select competitions users can enter for" error={inputs.errors.competitions} />
        </div>
      </div>
      <Button title="continue" handleClick={() => (handleSubmit(1))} />
    </div>
  );

  const renderAlmostThere = () => (
    <div>
      <p className="create-event__title">Almost there, tell us more :)</p>
      <div className="create-event__form">
        <div className="create-event__form-input">
          <Textbox id="name" value={inputs.name} name="name"
          title="name" placeholder="event name" type="text" onChange={handleChange}
          info="the name your event will be called"
          error={inputs.errors.name} required />
        </div>
        <div className="create-event__form-input">
          <Textarea />
        </div>
      </div>
      <Button title="continue" handleClick={() => (handleSubmit(2))} />
    </div>
  );

  const renderPage = () => {
    if (currentPage === 1) return renderGetStarted();
    if (currentPage === 2) return renderAlmostThere();
    return renderGetStarted();
  }

  return (
    <div className="create-event">
      {renderPage()}
    </div>
  );
};

export default CreateEvent;
