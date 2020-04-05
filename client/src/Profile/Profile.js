import React from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { format } from 'date-fns';

import { Icon } from 'react-icons-kit';
import {mapPin} from 'react-icons-kit/feather/mapPin'
import {calendar} from 'react-icons-kit/feather/calendar'

import ErrorPage from '../ErrorPage';
import Loading from '../Loading';
import FeedProfile from '../FeedProfile';

import {COLORS} from '../constants';



const Profile = () => {
  const {profileId} = useParams();
  // console.log('profileid ',profileId);
  const [loading, setLoading] = React.useState('loading');

  const [userProfile, setUserProfile] = React.useState(null);
  const [following, setFollowing] = React.useState('');

  React.useEffect(()=> {
    fetch( `/api/${profileId}/profile` )
    .then(data => data.json())
    .then(data => {
      console.log('profile data ', data);
      setUserProfile(data.profile);
      setFollowing(data.profile.isBeingFollowedByYou);
      setLoading('idle');
    }).catch(err => {
      console.error('Caught error Profile: ', err);
      setLoading('error');
    });
  }, [profileId])
  

  const toggleFollow = () => {
    // console.log('fol? ',following);
    setFollowing(!following);
    fetch(following? 
      `/api/${userProfile.handle}/unfollow` 
      :`/api/${userProfile.handle}/follow`
      , { method: 'PUT' }
      )
      .then(res => res.json())
      .then(res => {
        // console.log('res ',res);
      })
  };


  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
      return (
        <StyledDiv>
          <CoverImage src={userProfile.bannerSrc} alt='banner'/>
          <Avatar src={userProfile.avatarSrc} alt='avatar'/>
          <InfoDiv>
            <ButtonDiv>
              <button 
                disabled={profileId === 'currentuserprofile'}
                onClick={()=>toggleFollow()}
              >
                {following? 'Unfollow' : 'Follow'}
              </button>
            </ButtonDiv>
            <Handle>
              <p>{userProfile.displayName}</p>
              @{userProfile.handle} {userProfile.isFollowingYou? <span>Follows you</span> : null}
            </Handle>
            <p></p>
            <p>{userProfile.bio}</p>
            <Locale>
              <StyledIcon icon={mapPin} /> {userProfile.location} 
              <span><StyledIcon icon={calendar} /> Joined {format(new Date(userProfile.joined), 'MMMM · yyyy')}</span>
            </Locale>
            
              <Follow>
                <StyledNavLink to={`/${profileId}/follow/following`}>
                  <span>{userProfile.numFollowing}</span> Following 
                </StyledNavLink>
                <StyledNavLink to={`/${profileId}/follow/followers`}>
                <span>{userProfile.numFollowers}</span> Followers
                </StyledNavLink>
              </Follow>
            
          </InfoDiv>
          
          <FeedProfile profileId={profileId} />
        </StyledDiv>
      );
  };
};

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  h2 {
    margin: .5rem 1rem ;
    border-bottom: 1px solid lightgray;
  }
`;
const CoverImage = styled.img`
  height: 15rem;
  width: 100%;
  
`;
const Avatar = styled.img`
  position: absolute;
  top: 10rem;
  left: 1rem;
  height: 10rem;
  border: 3px solid whitesmoke;
  border-radius: 50%;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    cursor: pointer;
    margin: 1.5rem 1rem;
    color: white;
    font-size: 1rem;
    font-family: sans-serif;
    font-weight: bold;
    background: ${COLORS.primary};
    border: none;
    border-radius: 25px;
    padding: .75rem 1rem;
    /* &:focus {
      outline: none; */
    };
    &:disabled {
      opacity: .25;
    }
  }
`;
const InfoDiv = styled.div`
  padding: 0 1rem;
  
`;
const Handle = styled.div`
  margin: .5rem 0;
  /* font-style: italic; */
  font-size: 1rem;
  color: grey;
  p {
    font-style: initial;
    font-size: 1.5rem;
    color:black;
    font-weight:bold;
  }
  span {
    padding: .15rem .3rem;
    background: lightgray;
    border-radius: 7px;
  }
`;
const Locale = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  color: grey;
  span {
    margin-left: 1rem;
  }
`;
const StyledIcon = styled(Icon)`
  vertical-align: 12%;
  
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover{
    text-decoration: underline;
  }
`;
const Follow = styled.p`
  margin-bottom: 1rem;
  color: grey;
  span {
    color: black;
    font-weight: bold;
    
  }
  & :last-child {
    margin-left: 1rem;
  }
`;





export default Profile;