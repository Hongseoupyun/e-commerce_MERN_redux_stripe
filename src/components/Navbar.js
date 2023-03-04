import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
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
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  background-color: none;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid black;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: underline crimson;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

export default Navbar;
