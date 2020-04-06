import React from 'react';
import styled from 'styled-components';

import Heart from './Heart';
import PoppingCircle from '../PoppingCircle';
import ScaleIn from '../ScaleIn';
import ConfettiPiece from '../ConfettiPiece';


const PARTICLE_COLORS = ['#e53935', '#1e88e5', '#43a047', '#fdd835', '#fb8c00'];

const randy = (min, max) => {
  let rand = Math.floor((Math.random()*(max-min)) + min);
  return rand;
};

const range = n => Array.from(Array(n).keys());

const LikeButton = ({ isLiked, onClick, onKeyDown, size = 38 }) => {
  const heartSize = size * 0.6;
  const confettiSize = size * 0.15;
  return (
    <Wrapper onClick={onClick} onKeyDown={onKeyDown} tabIndex="0" style={{ width: size, height: size }}>
      <TopDiv>
        {isLiked? ( <ScaleIn><Heart width={heartSize} isToggled={isLiked} /></ScaleIn> ) 
        : (<Heart width={heartSize} isToggled={isLiked} />)}
      </TopDiv>
      <BottomDiv>
        {isLiked && range(12).map(i => (
          <ConfettiPiece 
            key={i}
            size={confettiSize}
            color={PARTICLE_COLORS[randy(0, 5)]}
            angle={360 * (i / 12)}
            distance={randy(10, 25)}
          />
        ))}
        {isLiked && <PoppingCircle size={size} color="#E790F7"/>}
      </BottomDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopDiv = styled.div`
  position: relative;
  z-index: 1;
`;

const BottomDiv = styled.div`
  position: absolute;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
