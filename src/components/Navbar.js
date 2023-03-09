import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { mobile } from "responsive";
import { useState } from "react";

function Navbar() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>SEOUP.</Logo>
        </Center>
        <Right>
          <MenuItem>Register</MenuItem>
          <MenuItem>Sign In</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
        </Right>
        <HamburgerMenu
          onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
        >
          {isHamburgerMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </HamburgerMenu>
      </Wrapper>
      {isHamburgerMenuOpen && (
        <Menu>
          <Items>
            <Item>Register</Item>
            <Item>Sign In</Item>
            <Item>My Cart</Item>
          </Items>
        </Menu>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  background-color: none;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: 4 })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid black;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: underline crimson;
  ${mobile({ fontSize: "24px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const HamburgerMenu = styled.div`
  flex: 1;
  display: none;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })}
  cursor: pointer;
`;

const Menu = styled.div`
  display: none;
  width: 100%;
  height: 50vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.95);
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 1;
  ${mobile({ display: "flex", flexDirection: "column" })}
  transition: all 0.5s ease;
`;

const Items = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;
const Item = styled.li`
  font-size: 30px;
  cursor: pointer;
  transition: all 0.5s ease;
  text-decoration: underline white;
  &:hover {
    transition: all 0.5s ease;
    font-size: 35px;
  }
`;

export default Navbar;
