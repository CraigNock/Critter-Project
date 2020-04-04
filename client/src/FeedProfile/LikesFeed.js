import React from 'react';
import styled from 'styled-components';

import Tweet from '../Tweet';

const LikesFeed = ({feedData}) => {
  const likesData = {...feedData};
  //filter tweets for liked
  const ids = likesData.tweetIds; //array
  const tweets = likesData.tweetsById; //object of objects, keys are ids

  

  return (
    <StyledDiv>
      <Tweet data={feedData} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  
`;


export default LikesFeed;