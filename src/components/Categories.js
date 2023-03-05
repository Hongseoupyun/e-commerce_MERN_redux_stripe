import React from "react";
import styled from "styled-components";
import CategoryItem from "components/CategoryItem";
import { categories } from "data";

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

export default Categories;
