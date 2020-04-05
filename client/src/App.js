import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorPage from './ErrorPage';
import Loading from './Loading';
import GlobalStyles from './GlobalStyles';
import Homefeed from './Homefeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import Profile from './Profile';
import TweetDetails from './TweetDetails';
import Sidebar from './Sidebar';
import Following from './FollowPage';

import {CurrentUserContext} from './CurrentUserContext';

const App = () => {
  const {userState, actions: {changeUser, changeStatus,changeShowError}} = React.useContext(CurrentUserContext);

  React.useEffect( () => {
    fetch('/api/me/profile')
      .then(data => data.json())
      .then(data => {
        // console.log('current user ', data.profile);
        changeUser(data.profile);
        changeStatus('idle');
      })
      .catch(err => {
        console.error('Caught error App: ', err);
        changeShowError(true);
      });
// eslint-disable-next-line
  }, []);

//Remember: Order of routes matters.
  if (userState.showError) {
    return ( <ErrorPage/> )
  } else {
    return (
      <>
      <GlobalStyles />
      <StyledWrapper>
        <BrowserRouter>
        <Sidebar />
        {userState.currentStatus === 'loading'? <Loading size={50} />:
          <Switch>
            <Route exact path='/'>
              <Homefeed />
            </Route>
            <Route path='/tweet/:tweetId'>
              <TweetDetails />
            </Route>
            <Route path='/notifications'>
              <Notifications />
            </Route>
            <Route path='/bookmarks'>
              <Bookmarks />
            </Route>
            <Route path='/:profileId/follow'>
              <Following />
            </Route>
            <Route path='/:profileId'>
              <Profile />
            </Route>
          </Switch>
        }
        </BrowserRouter>
      </StyledWrapper>
      </>
    );
  }
};

const StyledWrapper = styled.div`
  display: flex;

`;

// const StyledDiv = styled.div`
//   width: 100%;
//   margin-right: 5vw;
//   border-right: 1px solid lightgray;
//   h2 {
//     margin: .5rem 1rem ;
//     border-bottom: 1px solid lightgray;
//   }
// `;


export default App;
