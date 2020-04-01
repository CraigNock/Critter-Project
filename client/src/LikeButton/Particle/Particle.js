import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';



const convertDegreesToRadians = angle => (angle * Math.PI) / 180;

const Particle = ({distance, angle, children}) => {

  const angleInRads = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRads) * distance;
  const y = Math.sin(angleInRads) * distance;

  const shootStyle = useSpring({
    transform: `translate(${x}px, ${y}px)`,
    from : {transform: `translate(${x/10}px, ${y/10}px)`},
    // delay:1000,
    config: { 
      mass: 1,
      tension: 300,
      friction: 60,
    }
  });

  const opacityStyle = useSpring({
    opacity: 0,
    from: {
      opacity: 1
    },
    delay:300,
    config: { 
      mass: 1,
      tension: 300,
      friction: 60,
    }
  });

  return (
    <Wrapper
      style={{
        ...shootStyle,
        ...opacityStyle,
      }}
    >
      {children}
    </Wrapper>
  )
};


const Wrapper = styled(animated.div)`
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export default Particle;