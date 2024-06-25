// Assuming this is a component named ImageContainer.js
import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px; // Adjust as needed
`;

const ImageContainer = ({ imageUrl }) => {
  return <Image src={imageUrl} alt="User" />;
};

export default ImageContainer;
