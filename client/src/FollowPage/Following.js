import React from 'react';
import styled from 'styled-components';
import {useParams, useHistory} from 'react-router-dom';

import ErrorPage from '../ErrorPage';
import Loading from '../Loading';
import FollowCard from './FollowCard';

import {COLORS} from '../constants';

const Following = () => {
  const {profileId} = useParams();

  const[loading, setLoading] = React.useState('loading');
  const[followingData, setFollowingData] = React.useState(null);


  React.useEffect(() => {
    // setLoading('idle');
    fetch(`/api/${profileId}/following`)
        .then(data => data.json())
        .then(data => {
          setFollowingData(data);
          setLoading('idle');         
        }).catch(err => {
          console.error('Caught error ProfTweetFeed: ', err);
          setLoading('error');
        });
  }, [profileId]);

  console.log('followingdata ', followingData);


  switch (loading) {
    case 'loading':
      return (<Loading size={50}/>);
    case 'error':
      return (<ErrorPage/>);
    default:
      return(
        <>
        {followingData.following.map(follower => {
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



export default Following;