import React from "react";
import { StyledCol, StyledContainer, StyledRow } from "../home.styles";

interface Props {
  nav?: any;
  main?: any;
}

export const HomeContainer = ({ nav = null, main = null }: Props): any => (
  <StyledContainer fluid>
    <StyledRow>
      <StyledCol xs={4} sm={4} md={4} lg={4}>
        {nav}
      </StyledCol>
      <StyledCol xs={8} sm={8} md={8} lg={8}>
        {main}
      </StyledCol>
    </StyledRow>
  </StyledContainer>
);
