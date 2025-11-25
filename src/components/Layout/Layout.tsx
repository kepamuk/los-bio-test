import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(124deg, #00011a 22.27%, #0f0f0f 94.29%);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.02) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 150px 150px;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 1) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export function Layout() {
  return (
    <LayoutWrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </LayoutWrapper>
  );
}
