import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledContainer = styled.div`
  padding: 50px 50px 0 50px;
`;

export const StyledTitle = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledIcon = styled.img`
  width: 50px;
  margin-right: 10px;
`;

export const StyledCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

export const StyledLink = styled.a`
  word-break: break-all;
`;

export const StyledTarget = styled.div`
  margin: 15px auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #e6a35e;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;

export const StyledNonContextContainer = styled.div`
  padding: 150px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.25);
  }
`;
