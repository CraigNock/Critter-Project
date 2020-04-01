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

import {CurrentUserContext} from './CurrentUserContext';

const App = () => {
  const {userState, actions: {changeUser, changeStatus,}} = React.useContext(CurrentUserContext);

  React.useEffect( () => {
    fetch('/api/me/profile')
      .then(data => data.json())
      .then(data => {
        // console.log('current user ', data.profile);
        changeUser(data.profile);
        changeStatus('idle');
      })
// eslint-disable-next-line
  }, []);


  if (userState.currentStatus === 'loading') {
    return (
      <LoadingDiv>
        Loading...
      </LoadingDiv>
    )
  } else {
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

};

const StyledWrapper = styled.div`
  display: flex;

`;

const LoadingDiv = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;


export default App;
