import React from 'react';
import styled, { keyframes } from 'styled-components';

const PoppingCircle = ({size, color}) => {
  return(
    <Circle
    style={{
      width: size,
      height: size,
      backgroundColor: color,
    }}
    />
    
  )
};

const appear = keyframes`
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {      
      scale(1);
      opacity: 0;
    }
  `;

const Circle = styled.div`
  display:block;
  position: absolute;
  z-index:0;
  border-radius: 50%;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${appear} 1000ms forwards;
  }
`;



export default PoppingCircle;