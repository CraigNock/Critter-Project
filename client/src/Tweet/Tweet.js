import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
// eslint-disable-next-line
import {NavLink, useHistory} from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {repeat} from 'react-icons-kit/feather/repeat'

import {CurrentUserContext} from '../CurrentUserContext';


import ActionBar from '../ActionBar';
// import TweetDetails from '../TweetDetails';


const Tweet = ({data, filtero}) => {
  let info = data;
  console.log('data ', info, filtero);


  let history = useHistory();

  const {actions: {changeViewing}} = React.useContext(CurrentUserContext);

  // const handleClick = (ev, profileId) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   useHistory().push(`/${profileId}/tweets`);
  // }

  return (
    <>
    {info.tweetIds.map(id => {
      let details = info.tweetsById[id];
      let date = format(new Date(details.timestamp), 'MMM do');
      // if(filtero==='likes'){ if (details.isLiked) {
      return(
      <div key={id}>
      {details.retweetFrom? 
      <Retweeted><Icon size={15} icon={repeat}/> {details.retweetFrom.handle} Remeowed</Retweeted>
      : null}
      <StyledDiv key={id}>
        <Avatar><img src={details.author.avatarSrc} alt='avatar'/></Avatar>
        <SubDiv>
          {/* <StyledNavLink to={`/tweet/${id}`}> */}
          <TweetLink onClick={ev => history.push(`/tweet/${id}`)}>
          <Handle>
            <span tabIndex="0" onClick={ev => {
              ev.stopPropagation(); 
              changeViewing(details.author.handle);
              history.push(`/${details.author.handle}/tweets`);
              }} 
            >
              {details.author.displayName}
            </span>
            @ {details.author.handle} | {date}
          </Handle>
            <Content>
              <p>{details.status}</p>
              {details.media.map(thing => {
                return <img key={thing.url} src={thing.url} alt='thing'/>
              })}
            </Content>
          </TweetLink>
          {/* </StyledNavLink> */}
          <ActionBar 
            tweetId={id}
            numLikes={details.numLikes}
            numRetweets={details.numRetweets}
            isLiked={details.isLiked}
            isRetweeted={details.isRetweeted}
          />
        </SubDiv>
      </StyledDiv>
      </div>
      )
    })}
    </>
  )
};

// const StyledNavLink = styled(NavLink)`
//   text-decoration: none;
//   color: black;
// `;
const Retweeted = styled.p`
  margin: .75rem 2.75rem .25rem;
  font-size: .75rem;
  color: gray;
`;
const TweetLink = styled.div`
  cursor: pointer;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items:space-between;
  border-bottom: .5px solid lightgray;
`;
const Avatar = styled.div`
  height: 100%;
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



const Handle = styled.p`
  margin-top: .5rem;
  font-style: italic;
  font-size: .75rem;
  color: grey;
  span {
    &:hover {
      text-decoration: underline;
    }
    font-style: initial;
    font-size: 1rem;
    color:black;
    font-weight:bold;
    margin-right: .75rem;
    /* vertical-align:sub; */
  }
`;
const Content= styled.div`
  max-width: 100%;
  p {
    margin: 1rem 0;
  }
  img{
    border-radius: 20px;
    max-height: 400px;
    max-width: 100%;
  }
`;


export default Tweet;