import React from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import Loading from '../Loading';
import Tweet from '../Tweet';

// import MediaFeed from './MediaFeed';
// import LikesFeed from './LikesFeed';


const TweetFeed = () => {
  const {profileId} = useParams();
  const {filter} = useParams();
  console.log('id ', profileId, filter);

  // const[filterTog, setFilterTog] = React.useState(false);
  // if(filter==='likes'){()=> setFilterTog(true)};
  // console.log('id ', filter);
  

  const[loading, setLoading] = React.useState('loading');
  const[feedData, setFeedData] = React.useState(null);
  
  React.useEffect(() => {
    // (profileId === 'currentuserprofile')? '/api/me/home-feed' :
    fetch(`/api/${profileId}/feed`)
        .then(data => data.json())
        .then(data => {
          setFeedData(data);
          setLoading('idle');
          
        })
  // eslint-disable-next-line
  }, [profileId]);

  
  if (loading === 'loading') {
    return (
      <Loading size={50}/>
      )
  } else {
    // console.log(feedData);
    return (
      <StyledDiv>
        <Tweet data={feedData} filtero={filter} />
      </StyledDiv>
    );
  }
};

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  
`;


export default TweetFeed;