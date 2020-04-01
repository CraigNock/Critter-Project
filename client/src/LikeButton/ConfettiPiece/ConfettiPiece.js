import React from 'react';
import styled from 'styled-components';
// import { useSpring, animated } from 'react-spring';

import Particle from '../Particle';


const ConfettiPiece = ({size, color, angle, distance}) => {
  return (
    <CenteredWithinParent
    style={{
      width:size,
      height:size,
    }}
    >
      <Particle angle={angle} distance={distance}>
        <Circle
          style={{
            width:size,
            height:size,
            background:color,
          }}
        />
      </Particle>
    </CenteredWithinParent>
  )
};

const CenteredWithinParent = styled.div`
  position: absolute;
  /* top: 50%; */
  /* left: 50%;  */
  border-radius: 50%;
`;

const Circle = styled.div`
  position: absolute;
  /* top:50%; */
  /* left:50%; */
  border-radius: 50%;
`;

export default ConfettiPiece;