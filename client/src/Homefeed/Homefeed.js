import React from 'react';
import styled from 'styled-components';

import TweetForm from '../TweetForm';
import Tweet from '../Tweet';



const Homefeed = () => {
  const[loading, setLoading] = React.useState('loading');
  const[feedData, setFeedData] = React.useState(null);
  
  const [tweetRefresh, setTweetRefresh] = React.useState(false);
  React.useEffect(() => {
    fetch('/api/me/home-feed')
        .then(data => data.json())
        .then(data => {
          setFeedData(data);
          setLoading('idle');
        })
  // eslint-disable-next-line
  }, [tweetRefresh]);

  const addTweetToFeed = (data) => {
    // console.log('data ', data);
    setTweetRefresh(!tweetRefresh);
  };
  
  if (loading === 'loading') {
    return (
      <StyledDiv><h2>Loading...</h2></StyledDiv>
      )
  } else {
    // console.log(feedData);
    return (
      <StyledDiv>
        <h2>Home</h2>
        <TweetForm addTweetToFeed={addTweetToFeed} />

        <Tweet data={feedData} />
      </StyledDiv>
    );
  }
};

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  h2 {
    margin: .5rem 1rem ;
    border-bottom: 1px solid lightgray;
  }
`;

export default Homefeed;