import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

import {messageSquare} from 'react-icons-kit/feather/messageSquare'
import {repeat} from 'react-icons-kit/feather/repeat'
// import {heart} from 'react-icons-kit/feather/heart'
import {upload} from 'react-icons-kit/feather/upload'

import {COLORS} from '../constants';
import LikeButton from '../LikeButton/LikeButton';

const ActionBar = ({numLikes, numRetweets, isLiked, isRetweeted}) => {

  const [like, setLike] = React.useState(isLiked);

  const toggleLike = () => {

  };

  return (
    <StyledBar>
      <StyledIcon size={18} icon={messageSquare} />
      <StyledRetweet 
        size={18} 
        icon={repeat} 
        style={{color: isRetweeted? 'rgba(21,101,192 ,1)' : 'black'}} 
      /><StyledSpan>{numRetweets}</StyledSpan>
      {/* <StyledHeart size={18} icon={heart} /><span>{numLikes}</span> */}
      
      <LikeButton 
        isLiked={like}
        onClick={()=>setLike(!like)}
      /><span>{numLikes}</span>
      
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
  margin-right: 2rem;
`;

export default ActionBar;