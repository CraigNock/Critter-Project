import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import {useParams} from 'react-router-dom';
import {NavLink} from 'react-router-dom';


import ActionBar from '../ActionBar';


const TweetDetails = () => {
  const {tweetId} = useParams();

  const [details, setDetails] = React.useState(null);

  React.useEffect(()=> {
    fetch(`/api/tweet/${tweetId}`)
    .then(data => data.json())
    .then(data => {
      // console.log('deet data ', data.tweet);
      setDetails(data.tweet);
      
    })
// eslint-disable-next-line
  }, []);
  
  return (
    <>
    {details===null? <StyledDivo><h2>Loading...</h2></StyledDivo> :
    <StyledDivo>
      <StyledNavLink exact to={'/'}><h2>{"🢘 Meow"}</h2></StyledNavLink>
      <StyledDiv>
          <SubDiv>
          <Avatar><img src={details.author.avatarSrc} alt='avatar'/></Avatar>
            <Handle>
              <p>{details.author.displayName}</p> 
              @ {details.author.handle} 
            </Handle>
          </SubDiv>
            <Content>
              <p>{details.status}</p>
              {details.media.map(thing => {
                return <img key={thing.url} src={thing.url} alt='thing'/>
              })}
            </Content>
            <StyledDate>{format(new Date(details.timestamp), 'HH:mm a · MMM do yyyy')} · Critter Web App</StyledDate>
            <ActionBar
              numLikes={details.numLikes}
              numRetweets={details.numRetweets}
              isliked={details.isLiked}
              isRetweeted={details.isRetweeted}
            />
        </StyledDiv>
    </StyledDivo>
    }
    </>
  );
};



const StyledDivo = styled.div`
  width: 100%;
  margin-right: 5vw;
  border-right: 1px solid lightgray;
  h2 {
    margin: .5rem 1rem ;
    border-bottom: 1px solid lightgray;
  }
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items:space-between;
  padding: 1rem;
  border-bottom: 1px solid lightgray;

`;
const Avatar = styled.div`
  height: 100%;
  width: fit-content;
  img {
    height:3rem;
    width:3rem;
    border-radius: 50%;
  }
`;
const SubDiv = styled.div`
  display: flex;
  padding-right:1rem;
`;
const Handle = styled.div`
  margin-top: .5rem;
  font-style: italic;
  font-size: .75rem;
  color: grey;
  margin-left: .75rem;
  p {
    font-style: initial;
    font-size: 1rem;
    color:black;
    font-weight:bold;
  }
`;
const Content= styled.div`
  max-width: 100%;
  p {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
  img{
    border-radius: 20px;
    max-width: 100%;
  }
`;
const StyledDate = styled.p`
  font-size: .75rem;
  padding: .5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid lightgray;
`;

export default TweetDetails;