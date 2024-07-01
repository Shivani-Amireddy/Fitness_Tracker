import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 42px;
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 40px;
  right: 0;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
          Fittrack
        </NavLogo>

        <NavItems>
          <Navlink to="/dashboard">Dashboard</Navlink>
          <Navlink to="/food-logging">Food Logging</Navlink>
          <Navlink to="/activity-logging">Activity Logging</Navlink>
          <Navlink to="/water-intake">Water Intake</Navlink>
          <Navlink to="/sleep-tracking">Sleep Tracking</Navlink>
          <Navlink to="/recommendations">Recommendations</Navlink>
          <Navlink to="/goals">Goals</Navlink>
          <Navlink to="/social-sharing">Social Sharing</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar src={currentUser?.img} onClick={toggleDropdown}>
            {currentUser?.name[0]}
          </Avatar>
          <DropdownMenu isOpen={isOpen}>
            <DropdownItem as={LinkR} to="/profile">
              Edit Profile
            </DropdownItem>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;


