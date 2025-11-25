import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ApiError = FetchBaseQueryError | SerializedError;

export interface ApiErrorResponse {
  status?: number;
  data?: {
    message?: string;
  };
}

export function getErrorMessage(error: unknown): string {
  if (!error) return "Произошла неизвестная ошибка";

  if (typeof error === "object" && error !== null) {
    if (
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data &&
      typeof (error.data as { message?: unknown }).message === "string"
    ) {
      return (error.data as { message: string }).message;
    }

    if (
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      return (error as { message: string }).message;
    }
  }

  return "Произошла ошибка при загрузке данных";
}

export function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status: unknown }).status === 404
  );
}
