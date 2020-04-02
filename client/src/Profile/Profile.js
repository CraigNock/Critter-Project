import React from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
// import {NavLink} from 'react-router-dom';
import {CurrentUserContext} from '../CurrentUserContext';

const Profile = () => {
  const {profileId} = useParams();
  console.log(profileId);

  const {userState} = React.useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = React.useState(userState.currentUser);

  React.useEffect(()=> {
    if (profileId !== 'currentuserprofile')
    fetch( `/api/${profileId}/profile` )
    .then(data => data.json())
    .then(data => {
      console.log('profile data ', data.profile);
      setUserProfile(data.profile);
      
    });
// eslint-disable-next-line
  }, [])
  console.log(userProfile);

  return (
    <StyledDiv>
      <CoverImage src={userProfile.bannerSrc} alt='banner'/>
      <Avatar src={userProfile.avatarSrc} alt='avatar'/>
      <InfoDiv>

      </InfoDiv>
      <SectionBar>
        
      </SectionBar>
      <TweetFeed/>
    </StyledDiv>
  );
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
  border-radius: 50%;
`;
const InfoDiv = styled.div`

`;
const SectionBar = styled.div`

`;
const TweetFeed = styled.div`

`;




export default Profile;