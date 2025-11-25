import { describe, it, expect } from "vitest";
import { apiSlice } from "./apiSlice";

describe("apiSlice", () => {
  it("should have correct reducer path", () => {
    expect(apiSlice.reducerPath).toBe("api");
  });

  it("should define getSlides endpoint", () => {
    const endpoints = apiSlice.endpoints;
    expect(endpoints.getSlides).toBeDefined();
  });

  it("should define getAdvantages endpoint", () => {
    const endpoints = apiSlice.endpoints;
    expect(endpoints.getAdvantages).toBeDefined();
  });

  it("should define getProjects endpoint", () => {
    const endpoints = apiSlice.endpoints;
    expect(endpoints.getProjects).toBeDefined();
  });

  it("should define getProjectBySlug endpoint", () => {
    const endpoints = apiSlice.endpoints;
    expect(endpoints.getProjectBySlug).toBeDefined();
  });

  it("should export hooks for all endpoints", () => {
    const {
      useGetSlidesQuery,
      useGetAdvantagesQuery,
      useGetProjectsQuery,
      useGetProjectBySlugQuery,
    } = apiSlice;

    expect(useGetSlidesQuery).toBeDefined();
    expect(useGetAdvantagesQuery).toBeDefined();
    expect(useGetProjectsQuery).toBeDefined();
    expect(useGetProjectBySlugQuery).toBeDefined();
  });

  it("should have correct base configuration", () => {
    expect(apiSlice.reducerPath).toBe("api");
    expect(apiSlice.endpoints).toBeDefined();
    expect(Object.keys(apiSlice.endpoints).length).toBeGreaterThan(0);
  });
});
