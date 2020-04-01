import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import ActionBar from '../ActionBar';


const Tweet = (data) => {
  let info = data.data;
  // console.log('data ', info);
  let date = format(new Date(info.timestamp), 'MMM Do');
  return (
    <StyledDiv>
      <Avatar><img src={info.author.avatarSrc} alt='avatar'/></Avatar>
      <SubDiv>
        <Handle>
          <span>{info.author.displayName}</span>
          @ {info.author.handle} | {date}
        </Handle>
        <Content>
          <p>{info.status}</p>
          {info.media.map(thing => {
            return <img key={thing.url} src={thing.url} alt='thing'/>
          })}
          
        </Content>
        <ActionBar/>
      </SubDiv>
    </StyledDiv>
  )
};

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