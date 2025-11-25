import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { ErrorMessage } from "./ErrorMessage";
import { theme } from "../../styles/theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("ErrorMessage", () => {
  it("renders with default message", () => {
    renderWithTheme(<ErrorMessage />);
    expect(
      screen.getByText("Произошла ошибка при загрузке данных")
    ).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    renderWithTheme(<ErrorMessage message="Ошибка сети" />);
    expect(screen.getByText("Ошибка сети")).toBeInTheDocument();
  });

  it("displays error icon", () => {
    renderWithTheme(<ErrorMessage />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("displays error title", () => {
    renderWithTheme(<ErrorMessage />);
    expect(screen.getByText("Ошибка")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    renderWithTheme(<ErrorMessage onRetry={onRetry} />);
    expect(screen.getByText("Попробовать снова")).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    renderWithTheme(<ErrorMessage />);
    expect(screen.queryByText("Попробовать снова")).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    renderWithTheme(<ErrorMessage onRetry={onRetry} />);

    const retryButton = screen.getByText("Попробовать снова");
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("applies fullHeight prop correctly", () => {
    const { container } = renderWithTheme(<ErrorMessage fullHeight />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ minHeight: "50vh" });
  });
});
