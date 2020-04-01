import React from 'react';
import styled from 'styled-components';

import Tweet from '../Tweet';



const Homefeed = () => {
  const[loading, setLoading] = React.useState(true);
  const[feedData, setFeedData] = React.useState(null);
  
  React.useEffect(() => {
    fetch('/api/me/home-feed')
        .then(data => data.json())
        .then(data => {
          setFeedData(data);
          setLoading(!loading);
        })
  // eslint-disable-next-line
  }, []);

  
  if (loading) {
    return (
      <StyledDiv><h2>Loading...</h2></StyledDiv>
      )
  } else {
    console.log(feedData);
    return (
      <StyledDiv>
        <h2>Home</h2>
        {feedData.tweetIds.map(id => {
          return (
            <Tweet key={id} data={feedData.tweetsById[id]}/>
          )
        })}
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
  }
`;

export default Homefeed;