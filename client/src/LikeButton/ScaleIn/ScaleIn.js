import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';





const ScaleIn = ({children}) => {
  const query = '(prefers-reduced-motion: reduce)';
  const mediaQueryList = window.matchMedia(query);
  const shouldReduceMotion = mediaQueryList.matches;

  const scaleStyle = useSpring({
    transform: 'scale(1)',
    from: {
      transform: 'scale(0)',
    },
    config: { 
      mass: 2,
      tension: 200,
      friction: 20,
    },
    immediate: shouldReduceMotion,
  });


  return (
    <Scale
    style={{...scaleStyle}}
    >
      {children}
    </Scale>
  )
};

const Scale = styled(animated.div)`

`;

export default ScaleIn;