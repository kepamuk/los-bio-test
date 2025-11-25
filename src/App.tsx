import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage";
import { Loading } from "./components/UI/Loading";

const ProjectPage = lazy(() =>
  import("./pages/ProjectPage").then((module) => ({
    default: module.ProjectPage,
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects/:slug",
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loading fullHeight />
              </div>
            }
          >
            <ProjectPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
