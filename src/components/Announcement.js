import React from "react";
import styled from "styled-components";

function Announcement() {
  return <Container>Super Deal! Free Shipping on Order over $100</Container>;
}

const Container = styled.div`
  height: 30px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

export default Announcement;
