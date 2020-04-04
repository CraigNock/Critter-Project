import React from 'react';
import styled from 'styled-components';
// import {NavLink} from 'react-router-dom';

import { Icon } from 'react-icons-kit';
// import {u1F405} from 'react-icons-kit/noto_emoji_regular/u1F405'
import {u1F52D} from 'react-icons-kit/noto_emoji_regular/u1F52D'

const ErrorPage = () => {

  return (
    <StyledDiv>
      <Icon size={60} icon={u1F52D} />
      <h2>An unknown error has occured.</h2>
      <p>Please try refreshing the page, or <span>contact support</span> if the problem persists.</p>
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  width: 100%;
  margin: 10% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: sans-serif;
  h2{
    margin: 2rem 0 1rem;
  }
  span {
    color: blue;
    text-decoration: underline;
    cursor:pointer;
  }
`;



export default ErrorPage;