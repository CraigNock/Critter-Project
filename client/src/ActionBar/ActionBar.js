import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import {messageSquare} from 'react-icons-kit/feather/messageSquare'
import {repeat} from 'react-icons-kit/feather/repeat'
import {upload} from 'react-icons-kit/feather/upload'

import {COLORS} from '../constants';
import LikeButton from '../LikeButton/LikeButton';

const ActionBar = ({tweetId, numLikes, numRetweets, isLiked , isRetweeted}) => {
  // console.log('lik ', tweetId, isLiked, isRetweeted, numLikes,numRetweets );
  const [like, setLike] = React.useState(isLiked);
  const [likeSum, setLikeSum] = React.useState(numLikes);

  const [retweet, setRetweet] = React.useState(isRetweeted);
  const [retweetSum, setRetweetSum] = React.useState(numRetweets);

  const toggleLike = () => {
    setLike(!like);
    fetch(`/api/tweet/${tweetId}/like`, { 
      method: 'PUT',
      body: JSON.stringify({like:!like}),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('likres ',res, 'like ', !like);
        !like? setLikeSum(n => n + 1) : setLikeSum(n => n - 1);
      })
  };
//if have time, is more efficient, combine these toggle functions
  const toggleRetweet = () => {
    setRetweet(!retweet);
    fetch(`/api/tweet/${tweetId}/retweet`, { 
      method: 'PUT',
      body: JSON.stringify({retweet:!retweet}),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log('retwres ',res, 'retw ', !retweet);
        !retweet? setRetweetSum(n => n + 1) : setRetweetSum(n => n - 1);
      })
  };

  return (
    <StyledBar>
      <StyledIcon size={18} icon={messageSquare} />
      <StyledRetweet 
        size={18} 
        icon={repeat} 
        style={{color: retweet? 'rgba(21,101,192 ,1)' : 'black'}}
        onClick={()=>toggleRetweet()} 
        tabIndex={0}
        onKeyDown={ev => {if(ev.keyCode === 13)toggleRetweet()}}
      /><StyledSpan>{retweetSum}</StyledSpan>
      {/* <StyledHeart size={18} icon={heart} /><span>{numLikes}</span> */}
      
      <LikeButton 
        isLiked={like}
        onClick={()=>toggleLike()}
        tabIndex={0}
        onKeyDown={ev => {if(ev.keyCode === 13)toggleLike()}}
      /><span>{likeSum}</span>
      
      <StyledIcon size={18} icon={upload} />
    </StyledBar>
  )
};


const StyledBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10rem 0 0;
  width: 100%;
  span {
    font-size: .75rem;
    margin-right:3rem;
  }
`;
const StyledIcon = styled(Icon)`
  padding: .5rem;
  margin: 0 2rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.background};
  }
`;
// const StyledHeart = styled(StyledIcon)`
//   fill: red;
//   &:hover {
//     color: rgba(240,98,146 ,1);
//     background-color: rgba(255,192,203 ,.3 );
//   }
// `;
const StyledRetweet = styled(StyledIcon)`
  &:hover {
    color: rgba(21,101,192 ,1);
    background-color: rgba(128,222,234 ,.2);
  }
`;

const StyledSpan = styled.span`
  margin-left: -2rem;
  /* margin-right: 4rem; */
`;

export default ActionBar;