import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import FontAwesome from 'react-fontawesome';

import './PostToEvent.scss';
import Button from '../Button';
import CustomTextarea from '../FormInput/CustomTextarea';
import Dropdown from '../FormInput/Dropdown';
import Capsule from '../Capsule';
import SearchBar from '../SearchBar';
import ImageUpload from '../ImageUpload/index';

const competitions = [
  { title: 'Best dancer', value: 1 },
  { title: 'Best caption', value: '2' },
];

const PostToEvent = (props) => {
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const postToEventForm = () => (
    <div className="post-to-event__container">
      <div className="form-content">
        <div className="search">
          <SearchBar
            handleChange={() => { console.log('search'); }}
          />
        </div>
        <div className="event">
          <Capsule
            title="#theCrib"
            handleClose={() => { console.log('close'); }}
            handleSelect={() => { console.log('select'); }}
          />
        </div>
        <div className="competitions">
          <Dropdown
            name="competition"
            options={competitions}
            value={selectedCompetition}
            error=""
            info="select competition you would like to enter"
            onChange={(event) => {
              console.log(event.target.value);
              const { value } = event.target;
              setSelectedCompetition(value);
            }}
            placeholder="select a competition"
            disabled
          />
        </div>
        <div className="post-image">
          <ImageUpload
            handleImageFileChange={() => { console.log('file changed'); }}
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
            onChange={() => {}}
            value=""
            error=""
          />
        </div>
        <div className="form-button">
          <Button
            handleClick={() => { console.log('clicked'); }}
            title="post"
            customStyles={{ height: '42px', width: '122px', borderColor: '#2d283e' }}
            disabled
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="post-to-event">
      {postToEventForm()}
    </div>
  );
};

PostToEvent.propTypes = {
  children: PropTypes.node,
};


export default PostToEvent;
