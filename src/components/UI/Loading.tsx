import styled, { keyframes } from "styled-components";
import type { LoadingProps } from "../../types";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div<{ $fullHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${({ $fullHeight }) => ($fullHeight ? "50vh" : "200px")};
  width: 100%;
  gap: 1rem;
`;

const Spinner = styled.div<{ $size?: string }>`
  width: ${({ $size }) => $size || "48px"};
  height: ${({ $size }) => $size || "48px"};
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #1078d7;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 500;
`;

export function Loading({
  fullHeight = false,
  size,
  text = "Загрузка...",
}: LoadingProps) {
  return (
    <LoadingWrapper $fullHeight={fullHeight}>
      <Spinner $size={size} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingWrapper>
  );
}
