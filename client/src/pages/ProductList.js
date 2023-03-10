import React from "react";
import styled from "styled-components";
import Navbar from "components/Navbar";
import Announcement from "components/Announcement";
import Products from "components/Products";
import Footer from "components/Footer";
import Newsletter from "components/Newsletter";
import { mobile } from "responsive";

function Productlist() {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select responsiveWidth={"25%"}>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select responsiveWidth={"25%"}>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select responsiveWidth={"55%"}>
            <Option>Sort by: Low Price</Option>
            <Option>Sort by: High Price</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "baseline",
    padding: "0px",
  })}
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0px 20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    width: "100%",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ fontSize: "16px" })}
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
  border: 1px solid lightgray;

  ${mobile({ width: (props) => props.responsiveWidth })}
`;
const Option = styled.option``;

export default Productlist;
