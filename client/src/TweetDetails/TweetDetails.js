import React from 'react';
import styled from 'styled-components';

const TweetDetails = (details) => {

  return (
    <StyledDiv>
        <Avatar><img src={details.author.avatarSrc} alt='avatar'/></Avatar>
        <SubDiv>
          <Handle>
            <span>{details.author.displayName}</span>
            @ {details.author.handle} | {date}
          </Handle>
          <Content>
            <p>{details.status}</p>
            {details.media.map(thing => {
              return <img key={thing.url} src={thing.url} alt='thing'/>
            })}
            
          </Content>
          <ActionBar
            numLikes={details.numLikes}
            numRetweets={details.numRetweets}
            isliked={details.isLiked}
            isRetweeted={details.isRetweeted}
          />
        </SubDiv>
      </StyledDiv>
  );
};

const StyledDiv = styled.div`


`;

export default TweetDetails;