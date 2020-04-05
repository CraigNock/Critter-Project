import React from 'react';
import styled from 'styled-components';
import {Route, NavLink} from 'react-router-dom';

import ErrorPage from '../ErrorPage';
import Loading from '../Loading';

import TweetFeed from './TweetFeed';
import MediaFeed from './MediaFeed';
import LikesFeed from './LikesFeed';

import {COLORS} from '../constants';

//get self feed if currentuser handle===profileid? use for likesfeed & media

const FeedProfile = ({profileId}) => {
  // console.log('feedprofile ', profile);
  const[loading, setLoading] = React.useState('loading');
  const[feedData, setFeedData] = React.useState(null);
  
  React.useEffect(() => {
    fetch(`/api/${profileId}/feed`)
        .then(data => data.json())
        .then(data => {
          setFeedData(data);
          setLoading('idle');         
        }).catch(err => {
          console.error('Caught error ProfTweetFeed: ', err);
          setLoading('error');
        });
  }, [profileId]);

  // console.log('feedprofile feedData', feedData);
  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
  return(
    <>
      <SectionBar>
        <StyledLink to={`/${profileId}/tweets`}>Tweets</StyledLink>
        <StyledLink to={`/${profileId}/media`}>Media</StyledLink>
        <StyledLink to={`/${profileId}/likes`}>Likes</StyledLink>
      </SectionBar>
      
      <Route path='/:profileId/tweets'>
        <TweetFeed feedData={feedData} />
      </Route>
      <Route path='/:profileId/media'>
        <MediaFeed feedData={feedData} />
      </Route>
      <Route path='/:profileId/likes'>
        <LikesFeed feedData={feedData} />
      </Route>
    </>
  )
  }
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