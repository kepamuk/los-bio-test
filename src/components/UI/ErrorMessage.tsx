import styled from "styled-components";
import type { ErrorMessageProps } from "../../types";

const ErrorWrapper = styled.div<{ $fullHeight?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: ${({ $fullHeight }) => ($fullHeight ? "50vh" : "200px")};
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const ErrorTitle = styled.h3`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ErrorText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 500px;
`;

const RetryButton = styled.button`
  margin-top: 2rem;
  padding: 0.875rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textWhite};
  border-radius: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.9;
  }
`;

export function ErrorMessage({
  message = "Произошла ошибка при загрузке данных",
  onRetry,
  fullHeight = false,
}: ErrorMessageProps) {
  return (
    <ErrorWrapper $fullHeight={fullHeight}>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>Ошибка</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <RetryButton onClick={onRetry}>Попробовать снова</RetryButton>
      )}
    </ErrorWrapper>
  );
}
