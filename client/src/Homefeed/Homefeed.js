import React from 'react';
import styled from 'styled-components';

import ErrorPage from '../ErrorPage';
import TweetForm from '../TweetForm';
import Tweet from '../Tweet';
import Loading from '../Loading';


const Homefeed = () => {

  const [loading, setLoading] = React.useState('loading');
  const [feedData, setFeedData] = React.useState(null);
  
  const [tweetRefresh, setTweetRefresh] = React.useState(false);
  React.useEffect(() => {
    fetch('/api/me/home-feed')
        // .then(data =>{if(!data.ok) throw Error(data.statusText); return data})
        .then(data => data.json())
        .then(data => {
          // console.log(data);
          setFeedData(data);
          setLoading('idle');
        }).catch(err => {
          console.error('Caught error Homefeed: ', err);
          setLoading('error');
        });
  // eslint-disable-next-line
  }, [tweetRefresh]);

  const addTweetToFeed = (data) => {
    // console.log('data ', data);
    setTweetRefresh(!tweetRefresh);
  };
  
  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
      return (
        <StyledDiv>
          <h2>Home</h2>
          <TweetForm addTweetToFeed={addTweetToFeed} />
          <Tweet data={feedData} />
        </StyledDiv>
      );
  };
};

//   if (loading === 'loading') {
//     return (
//       <Loading size={50}/>
//       )
//   } else if (loading === 'error') {
//     return ( <ErrorPage/> )
//   } else {
//     // console.log(feedData);
//     return (
//       <StyledDiv>
//         <h2>Home</h2>
//         <TweetForm addTweetToFeed={addTweetToFeed} />
//         <Tweet data={feedData} filtero={false}/>
//       </StyledDiv>
//     );
//   }
// };

const StyledDiv = styled.div`
  width: 100%;
  margin-right: 5vw auto;
  border-right: 1px solid lightgray;
  h2 {
    margin: .5rem 1rem ;
    border-bottom: 1px solid lightgray;
  }
`;

export default Homefeed;