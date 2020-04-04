import React from 'react';
import styled from 'styled-components';

import {CurrentUserContext} from '../CurrentUserContext';
import Loading from '../Loading';


import {COLORS} from '../constants';


const TweetForm = ({addTweetToFeed}) => {

  const {userState} = React.useContext(CurrentUserContext);
  // console.log(userState);

  const [content, setContent] = React.useState('');
  const [count, setCount] = React.useState(280);

  const [tweeting, setTweeting] = React.useState(false);

  const submitHandle = (ev) => {
    ev.preventDefault();
    if (count === 280) {
      console.log('blank');
      return;
    } else {
      console.log('submit tweet');
      setTweeting(true);
      fetch('/api/tweet', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
        },
        body:JSON.stringify({status: content})
      })
      .then(data => data.json())
      .then(data => {
        addTweetToFeed(data);
        setTweeting(false);
      }).catch(err => console.error('Caught error NewTweet: ', err));
    }
  };


  return(
    <StyledForm>
      <Avatar><img src={userState.currentUser.avatarSrc} alt='user avatar' /></Avatar>
      <StyledDiv>
        <textarea 
          type='text' 
          // required
          placeholder="What's happening?"
          value={content}
          onChange={(ev) => {
            setContent(ev.target.value);
            setCount(280 - (ev.target.value).length);
          }}
        >
        </textarea>
        <StyledSubDiv>
          <span
            style={{color: count<0? 'red':(count<55? 'orange': 'gray')}}
          >
            {count}
          </span>
          <button 
            name="submitButton"
            type='submit'
            disabled={count<0? true: false}
            onClick={ (ev)=> {
              submitHandle(ev);
              // ev.target.disabled= count<280? true: false;
              setContent('');
            }}
          >
            {tweeting? <Loading size={20} /> : 'Meow'}
          </button>
        </StyledSubDiv>
      </StyledDiv>
    </StyledForm>
  )
};


const StyledForm = styled.form`
  width: 100%;
  margin-right: 5vw;
  display: flex;
  padding: 0 1rem 1rem .5rem;
  border-bottom: 5px solid lightgray;

`;
const Avatar = styled.div`
  height: 100%;
  width: fit-content;
  img {
    height:3rem;
    width:3rem;
    margin: .5rem;
    border-radius: 50%;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  textarea {
    height: 5rem;
    font-family: sans-serif;
    border: none;
    border-radius: 10px;
    padding: .5rem;
    resize: none;
    &:focus {
      outline: none;
    }
  }
`;
const StyledSubDiv = styled.div`
  text-align: end;
  margin-top: .5rem;
  span {
  
    font-size: .75rem;
  }
  button {
    width: 3.75rem;
    height: 2rem;
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    background: ${COLORS.primary};
    border: none;
    border-radius: 15px;
    margin: 0 1rem;
    /* &:focus {
      outline: none;
    }; */
    &:disabled {
      opacity: .25;
    }
  }
`;



export default TweetForm;