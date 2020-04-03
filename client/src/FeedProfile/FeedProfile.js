import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';

import TweetFeed from './TweetFeed';


import {COLORS} from '../constants';

const FeedProfile = ({profile, setRefresh}) => {
  console.log('feedprofile ', profile);

  return(
    <>
    <BrowserRouter>
      <SectionBar>
        <StyledLink to={`/${profile}/tweets`}>Tweets</StyledLink>
        <StyledLink to={`/${profile}/media`}>Media</StyledLink>
        <StyledLink to={`/${profile}/likes`}>Likes</StyledLink>
      </SectionBar>
      <Switch>
        <Route path='/:profileId/:filter'>
          <TweetFeed setRefresh={setRefresh}/>
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  )
};

const SectionBar = styled.div`
  display: flex;
  margin-bottom: .5rem;
`;

const StyledLink = styled(NavLink)`
    flex: 1;
    text-decoration: none;
    text-align: center;
    padding: 1rem;
    border: none;
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: gray;
  &.active{
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary}
  }
`;



export default FeedProfile;