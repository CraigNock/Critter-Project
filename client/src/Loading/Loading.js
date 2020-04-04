import React from 'react';
import styled, {keyframes} from 'styled-components';

import { Icon } from 'react-icons-kit';
import {box} from 'react-icons-kit/feather/box'
// import {sun} from 'react-icons-kit/feather/sun'
// import {loader} from 'react-icons-kit/feather/loader'


const Loading = ({size}) => {
  return(
    <Idiv>
      <StyledIcon size={size}  icon={box} />
    </Idiv>
  )
};

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Idiv = styled.div`
  text-align: center;
  width: 100%;
`;
const StyledIcon = styled(Icon)`
  margin: 5% auto;
  animation: ${spinner} linear 1000ms infinite;
`;


export default Loading;