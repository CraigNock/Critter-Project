import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
// eslint-disable-next-line
import {NavLink, useHistory} from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {repeat} from 'react-icons-kit/feather/repeat'

import ActionBar from '../ActionBar';

const Tweet = ({data}) => {
  let info = data; //redundant, remove after troubleshooting
  console.log('tweetdata ', info);

  let history = useHistory();

  return (
    <>
    {info.tweetIds.map(id => {
      let details = info.tweetsById[id];
      let date = format(new Date(details.timestamp), 'MMM do');
      return(
      <div key={id}>
      {details.retweetFrom? 
      <Retweeted><Icon size={15} icon={repeat}/> {details.retweetFrom.handle} Remeowed</Retweeted>
      : null}
      <StyledDiv key={id}>
        <Avatar><img src={details.author.avatarSrc} alt='avatar'/></Avatar>
        <SubDiv>
          {/* <StyledNavLink to={`/tweet/${id}`}> */}
          <TweetLink 
            tabIndex="0" 
            aria-label='view tweet' 
            onClick={ev => history.push(`/tweet/${id}`)}
            onKeyDown={(ev) => {if(ev.keyCode === 13) history.push(`/tweet/${id}`);}}
            >
          <Handle>  
            <span 
              tabIndex="0" 
              aria-label='view user' 
              onClick={ev => {
              ev.stopPropagation();
              history.push(`/${details.author.handle}/tweets`);
              }} 
              onKeyPress={ev => {
                ev.stopPropagation();
                if(ev.keyCode === 13) history.push(`/${details.author.handle}/tweets`);  
                }} 
            >
              {details.author.displayName}
            </span>
            @ {details.author.handle} | {date}
          </Handle>
            <Content>
              <p>{details.status}</p>
              {details.media.map(mediathing => {
                return <img key={mediathing.url} src={mediathing.url} alt='mediathing'/>
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