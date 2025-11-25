import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Container } from "./Container";
import { theme } from "../../styles/theme";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Container", () => {
  it("renders children correctly", () => {
    const { getByText } = renderWithTheme(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct max-width styling", () => {
    const { container } = renderWithTheme(
      <Container>
        <div>Test</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle({ maxWidth: "1200px" });
  });

  it("centers content with auto margins", () => {
    const { container } = renderWithTheme(
      <Container>
        <div>Test</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle({ margin: "0 auto" });
  });

  it("applies horizontal padding", () => {
    const { container } = renderWithTheme(
      <Container>
        <div>Test</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle({ padding: "0 1rem" });
  });
});
