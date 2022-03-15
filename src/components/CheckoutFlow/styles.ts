import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  overflow: hidden;
`;

const slideEntrance = keyframes`
  from {
    opacity: 0;
    margin-left: 20%;
    width: 150%;
  }
  to {
    opacity: 1;
    margin-left: 0%;
    width: 100%;
  }
`;

export const SlideLeft = styled.div`
  animation: ${slideEntrance} 0.5s ease;
`;
