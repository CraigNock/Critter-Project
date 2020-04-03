import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import {lifeBuoy} from 'react-icons-kit/feather/lifeBuoy'


const Loading = () => {

  return(
    <>
    <StyledIcon size={36}  icon={lifeBuoy} />
    </>
  )
};

const StyledIcon = styled(Icon)`

`;


export default Loading;