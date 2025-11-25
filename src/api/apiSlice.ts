import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SlideRaw, AdvantageRaw, Project } from "../types";

const BASE_URL = "https://api.los-bio.ru";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Slides", "Advantages", "Projects", "Project"],
  endpoints: (builder) => ({
    getSlides: builder.query<SlideRaw[], void>({
      query: () => "/info/group/slide",
      providesTags: ["Slides"],
    }),

    getAdvantages: builder.query<AdvantageRaw[], void>({
      query: () => "/info/group/advantage",
      providesTags: ["Advantages"],
    }),

    getProjects: builder.query<Project[], void>({
      query: () => "/projects/",
      providesTags: ["Projects"],
    }),

    getProjectBySlug: builder.query<Project, string>({
      query: (slug) => `/projects/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Project", id: slug }],
    }),
  }),
});

export const {
  useGetSlidesQuery,
  useGetAdvantagesQuery,
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
} = apiSlice;
