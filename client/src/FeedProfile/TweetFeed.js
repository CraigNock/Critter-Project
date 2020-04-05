import React from 'react';
import styled from 'styled-components';
// import {useParams} from 'react-router-dom';

// import ErrorPage from '../ErrorPage';
// import Loading from '../Loading';
import Tweet from '../Tweet';

// import MediaFeed from './MediaFeed';
// import LikesFeed from './LikesFeed';

const TweetFeed = ({feedData}) => {
  // const {profileId} = useParams();
  // console.log('proftweetfeed', feedData);

  // const[loading, setLoading] = React.useState('loading');
  // const[feedData, setFeedData] = React.useState(null);
  
  // React.useEffect(() => {
  //   fetch(`/api/${profileId}/feed`)
  //       .then(data => data.json())
  //       .then(data => {
  //         setFeedData(data);
  //         setLoading('idle');         
  //       }).catch(err => {
  //         console.error('Caught error ProfTweetFeed: ', err);
  //         setLoading('error');
  //       });
  // }, [profileId]);

  // switch (loading) {
  //   case 'loading':
  //     return (<Loading size={50}/>);
  //   case 'error':
  //     return (<ErrorPage/>);
  //   default:
    return (
      <StyledDiv>
        <Tweet data={feedData} />
      </StyledDiv>
    );
  // }
};

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  
`;


export default TweetFeed;