import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import {NavLink} from 'react-router-dom';


import ActionBar from '../ActionBar';
// import TweetDetails from '../TweetDetails';


const Tweet = ({data, filtero}) => {
  let info = data;
  // console.log('data ', info, filtero);
  return (
    <>
    {info.tweetIds.map(id => {
      let details = info.tweetsById[id];
      let date = format(new Date(details.timestamp), 'MMM do');
      // if(filtero==='likes'){ if (details.isLiked) {
      return(
      <StyledDiv key={id}>
        <Avatar><img src={details.author.avatarSrc} alt='avatar'/></Avatar>
        <SubDiv>
          <Handle>
            <span>{details.author.displayName}</span>
            @ {details.author.handle} | {date}
          </Handle>
          <StyledNavLink to={`/tweet/${id}`}>
            <Content>
              <p>{details.status}</p>
              {details.media.map(thing => {
                return <img key={thing.url} src={thing.url} alt='thing'/>
              })}
              
            </Content>
          </StyledNavLink>
          <ActionBar
            numLikes={details.numLikes}
            numRetweets={details.numRetweets}
            isliked={details.isLiked}
            isRetweeted={details.isRetweeted}
          />
        </SubDiv>
      </StyledDiv>
      )
    })}
    </>
  )
};

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
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