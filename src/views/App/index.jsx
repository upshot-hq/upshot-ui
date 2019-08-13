import React, { Fragment } from 'react';
import './App.scss';

function App() {
  return (
    <Fragment>
      <div className="App">
        <div className="leftSide">
          <h1 className="logo">Upshot</h1>
          <div className="content">
            <div className="msg">
              <p>Making Events</p>
              <p>Engaging, Fun and Enjoyable</p>
            </div>
            <button className="auth-btn">Signup with google</button>
          </div>
        </div>
        <div className="rightSide" />
      </div>
    </Fragment>
  );
}

export default App;
