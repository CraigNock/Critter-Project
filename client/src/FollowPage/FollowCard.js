import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import {COLORS} from '../constants';

import {CurrentUserContext} from '../CurrentUserContext';


const FollowCard = ({follower}) => {
  const { userState } = React.useContext(CurrentUserContext);
  
  const [following, setFollowing] = React.useState(follower.isBeingFollowedByYou);

  let history = useHistory();

  const toggleFollow = () => {
    // console.log('fol? ',following);
    setFollowing(!following);
    fetch(following? 
      `/api/${follower.handle}/unfollow` 
      :`/api/${follower.handle}/follow`
      , { method: 'PUT' }
      )
      .then(res => res.json())
      .then(res => {
        // console.log('res ',res);
      })
  };

  return(
    <StyledDiv key={follower.handle}>
        <Avatar><img src={follower.avatarSrc} alt='avatar'/></Avatar>
        <TweetLink tabIndex="0" onClick={ev => {
          ev.stopPropagation();
          history.push(`/${follower.handle}/tweets`);
        }}>
          <SubDiv>
            <HandleDiv>
              <p>{follower.displayName}</p>
              @ {follower.handle}
            </HandleDiv>
            <p>{follower.bio}</p>
          </SubDiv>
        </TweetLink>
        <ButtonDiv>
          <button 
            disabled={follower.handle === userState.currentUser.handle}
            onClick={()=>toggleFollow()}
          >
            {following? 'Unfollow' : 'Follow'}
          </button>
        </ButtonDiv>
      </StyledDiv>
  )
};

const StyledDiv = styled.div`
  display: flex;
  padding: .5rem;
  border-bottom: .5px solid lightgray;
`;
const TweetLink = styled.div`
  width: 100%;
  cursor: pointer;
`;
const Avatar = styled.div`
  /* height: 100%; */
  width: fit-content;
  img {
    height:3rem;
    width:3rem;
    margin: .5rem;
    border-radius: 50%;
  }
`;
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right:1rem;
`;
const HandleDiv = styled.div`
  margin: .5rem;
  font-style: italic;
  font-size: .95rem;
  color: grey;
  p {
    font-style: initial;
    font-size: 1rem;
    color:black;
    font-weight:bold;
    margin-right: .75rem;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    cursor: pointer;
    margin: 1.5rem 1rem;
    color: white;
    font-size: .75rem;
    font-family: sans-serif;
    font-weight: bold;
    background: ${COLORS.primary};
    border: none;
    border-radius: 25px;
    padding: .5rem .75rem;
    &:disabled {
      opacity: .25;
    };
  };
`;



export default FollowCard;