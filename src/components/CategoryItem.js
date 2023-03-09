import React from "react";
import styled from "styled-components";

function CategoryItem(props) {
  const { item } = props;

  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-bottom: 25px;
`;

const Button = styled.button`
  border: none;
  padding: 13px;
  cursor: pointer;
  font-weight: 600;
`;

export default CategoryItem;
