import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Loading } from "./Loading";
import { theme } from "../../styles/theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Loading", () => {
  it("renders with default text", () => {
    renderWithTheme(<Loading />);
    expect(screen.getByText("Загрузка...")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    renderWithTheme(<Loading text="Подождите..." />);
    expect(screen.getByText("Подождите...")).toBeInTheDocument();
  });

  it("renders without text when text prop is empty", () => {
    renderWithTheme(<Loading text="" />);
    expect(screen.queryByText("Загрузка...")).not.toBeInTheDocument();
  });

  it("renders spinner element", () => {
    const { container } = renderWithTheme(<Loading />);
    const spinner = container.querySelector("div > div");
    expect(spinner).toBeInTheDocument();
  });

  it("applies fullHeight prop correctly", () => {
    const { container } = renderWithTheme(<Loading fullHeight />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ minHeight: "50vh" });
  });

  it("applies custom size to spinner", () => {
    const { container } = renderWithTheme(<Loading size="64px" />);
    const wrapper = container.firstChild as HTMLElement;
    const spinner = wrapper.firstChild as HTMLElement;

    const computedStyle = window.getComputedStyle(spinner);
    expect(computedStyle.width).toBe("64px");
    expect(computedStyle.height).toBe("64px");
  });
});
