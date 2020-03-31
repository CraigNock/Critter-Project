import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';
import Homefeed from './Homefeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import Profile from './Profile';
import TweetDetails from './TweetDetails';
import Sidebar from './Sidebar';


const App = () => {
  return (
    <>
    <GlobalStyles />
    <StyledWrapper>
      <BrowserRouter>
      <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Homefeed />
          </Route>
          <Route path='/notifications'>
            <Notifications />
          </Route>
          <Route path='/bookmarks'>
            <Bookmarks />
          </Route>
          <Route path='/tweet/:tweetId'>
            <TweetDetails />
          </Route>
          <Route path='/:profileId'>
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;

`;


export default App;
