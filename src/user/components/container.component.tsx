import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  children?: any;
}

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

export const UserContainer = ({ children = null }: Props): any => (
  <Grid>
    <StyledRow>
      <Col xs={12} md={8} lg={6}>
        {children}
      </Col>
    </StyledRow>
  </Grid>
);
