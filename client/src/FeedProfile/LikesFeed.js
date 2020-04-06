import React from 'react';
import styled from 'styled-components';

import Tweet from '../Tweet';

const LikesFeed = ({feedData}) => {
  let likesData = {...feedData};
  // for DEEP copy JSON.parse(JSON.stringify(feedData))
  //filter tweets for liked
  // const ids = likesData.tweetIds; //array
  const tweets = likesData.tweetsById; //object of objects, keys are ids
  
  //needs api that will grab feed for given user?? possibly filter at backend?
  //could set up with me/homefeed, but won't function on other profiles
  //what exactly does this section usually show? everything they liked? everything just from your feed they liked?

  // console.log('1 ',ids, newTweetsIds);
  const newTweetsIds = [];
  Object.values(tweets).forEach(tweet => {
    if (tweet.isLiked === true) newTweetsIds.push(tweet.id)
  });
  // console.log('2 ',ids, newTweetsIds);

  const newData = {...likesData, tweetIds:[...newTweetsIds],};
  console.log('final ', likesData); 
  return (
    <StyledDiv>
      <Tweet data={newData} />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  
`;


export default LikesFeed;