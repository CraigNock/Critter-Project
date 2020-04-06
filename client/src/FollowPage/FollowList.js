import React from 'react';
// import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import ErrorPage from '../ErrorPage';
import Loading from '../Loading';
import FollowCard from './FollowCard';


const FollowList = () => {
  const {profileId} = useParams();
  const {type} = useParams();

  const[loading, setLoading] = React.useState('loading');
  const[followingData, setFollowingData] = React.useState(null);


  React.useEffect(() => {
    console.log('type', type);
    setLoading('loading');
    fetch(`/api/${profileId}/${type}`)
        .then(data => data.json())
        .then(data => {
          type==='following'? setFollowingData(data.following) : setFollowingData(data.followers);
          setLoading('idle');         
        }).catch(err => {
          console.error('Caught error ProfTweetFeed: ', err);
          setLoading('error');
        });
  }, [profileId, type]);

  console.log('followingdata ', followingData);


  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
      return(
        <>
        {followingData.map(follower => {
          return(
          <div key={follower.handle}> 
            <FollowCard follower={follower} /> 
          </div>
        )
        })}
      </>
      )
  };
};



export default FollowList;