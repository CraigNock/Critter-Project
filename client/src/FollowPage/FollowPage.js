import React from 'react';
import styled from 'styled-components';
import {Route, NavLink} from 'react-router-dom';
import {useParams} from 'react-router-dom';

import ErrorPage from '../ErrorPage';
import Loading from '../Loading';

import FollowList from './FollowList';

import {COLORS} from '../constants';

//get self feed if currentuser handle===profileid? follow button toggle

const FollowPage = () => {
  const {profileId} = useParams();
  // console.log('FollowPage ', profileId);
  const[loading, setLoading] = React.useState('loading');
  // const[feedData, setFeedData] = React.useState(null);
  React.useEffect(() => {
    setLoading('idle');
  }, [profileId]);

  // console.log('feedprofile feedData', feedData);
  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
  return(
    <StyledDivo>
      <StyledBackLink exact to={`/${profileId}/tweets`}><h2>{"🢘 Meow"}</h2></StyledBackLink>
      <SectionBar>
        <StyledLink to={`/${profileId}/follow/followers`}>Followers</StyledLink>
        <StyledLink to={`/${profileId}/follow/following`}>Following</StyledLink>
      </SectionBar>
      
      <Route path='/:profileId/follow/:type'>
        <FollowList />
      </Route>
      {/* <Route path='/:profileId/follow/following'>
        <Following />
      </Route> */}
    </StyledDivo>
  )
  }
};

const StyledDivo = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  h2 {
    margin: .5rem 1rem ;
    border-bottom: 1px solid lightgray;
  }
`;
const StyledBackLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover{
    text-decoration: underline;
  }
`;

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



export default FollowPage;