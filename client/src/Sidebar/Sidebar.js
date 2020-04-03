import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/feather/home';
import {gitlab} from 'react-icons-kit/feather/gitlab';
import {bell} from 'react-icons-kit/feather/bell';
import {bookmark} from 'react-icons-kit/feather/bookmark';
// import {loader} from 'react-icons-kit/feather/loader';
import Loading from '../Loading';

import {CurrentUserContext} from '../CurrentUserContext';

import logo1 from '../assets/logo1.svg';
import {COLORS} from '../constants';

const Sidebar = () => {

  const {userState} = React.useContext(CurrentUserContext);

  return (
    <StyledWrapper>
      <StyledLogo src={logo1} aria-label='cat logo'/>
      <StyledLink exact to={'/'}><StyledIcon size={24} icon={home} /> 
      Home
      </StyledLink>

      {userState.currentUser?
      <StyledLink to={`/${userState.currentUser.handle}/tweets`} >
        <StyledIcon size={24} icon={gitlab} />Profile
      </StyledLink>
      : <><Loading size={24}/></>}

      <StyledLink to={'/notifications'}><StyledIcon size={24} icon={bell} /> 
      Notifications</StyledLink>
      <StyledLink to={'/bookmarks'}><StyledIcon size={24} icon={bookmark} />
      Bookmarks</StyledLink>
    </StyledWrapper>
  )
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background: whitesmoke;
  width: 20rem;
  height: 100vh;
  padding: 2rem 2rem 0 0;
  margin-left: 5vw;
  border-right: 1px solid lightgray;
`;

const StyledLogo = styled.img`
  margin: 0 auto 1rem 0;
  /* padding: 0 .75rem 0 0; */
`;

const StyledLink = styled(NavLink)`
  font-family: sans-serif;
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  color: black;
  width: fit-content;
  padding: .5rem .75rem;
  margin: .25rem 0;
  border-radius: 20px;
  /* border:1px solid lightgray; */
  font-size: 1.25rem;
  font-weight: bold;
  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.background};
  }
  &.active{
    color: ${COLORS.primary};
  }
`;

const StyledIcon = styled(Icon)`
  vertical-align: 12%;
  margin-right: 1.5rem;
  ${StyledLink}:hover & {
    color: ${COLORS.primary};
  }
`;




export default Sidebar;