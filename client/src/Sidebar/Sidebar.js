import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import { Icon } from 'react-icons-kit';
import {home} from 'react-icons-kit/feather/home';
import {gitlab} from 'react-icons-kit/feather/gitlab';
import {bell} from 'react-icons-kit/feather/bell';
import {bookmark} from 'react-icons-kit/feather/bookmark';

import logo from '../assets/logo.svg';
import {COLORS} from '../constants';

const Sidebar = () => {

  return (
    <StyledWrapper>
      <StyledLogo src={logo} aria-label='cat logo'/>
      <StyledLink exact to={'/'}><StyledIcon size={24} icon={home} /> 
      Home</StyledLink>
      <StyledLink to={'/currentuserprofile'}><StyledIcon size={24} icon={gitlab} /> 
      Profile</StyledLink>
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
  background: whitesmoke;
  width: fit-content;
  padding: 2rem 3rem 3rem;
`;

const StyledLogo = styled.img`
  margin: 1rem 0;
  padding: 0 .75rem;
`;

const StyledLink = styled(NavLink)`
  font-family: sans-serif;
  text-decoration: none;
  color: black;
  width: fit-content;
  padding: .5rem .75rem;
  margin: .25rem 0;
  border-radius: 20px;
  /* border:1px solid lightgray; */
  font-size: 1.5rem;
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