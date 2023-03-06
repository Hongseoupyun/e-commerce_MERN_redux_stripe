import React from "react";
import styled from "styled-components";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Type your email to get subscription" />
        <Button>
          <ForwardToInboxOutlinedIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  background-color: #fcf5f5;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 300;
`;
const InputContainer = styled.div`
  display: flex;
  width: 50%;
  height: 40px;
  background-color: white;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;`;

const Button = styled.button`
  border: none;
  background-color: orange;
  color: white;
  flex: 1;`;

export default Newsletter;
