import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsSmallDesktop,
  useIsDesktop,
} from "./useMediaQuery";

const createMatchMediaMock = (matches: boolean) => {
  return vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true when media query matches", async () => {
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false when media query does not match", async () => {
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("sets up event listener for media query changes", () => {
    const addEventListenerMock = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(addEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});

describe("useIsMobile", () => {
  it("returns true for mobile viewport", async () => {
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false for non-mobile viewport", async () => {
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});

describe("useIsTablet", () => {
  it("returns true for tablet viewport", async () => {
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsTablet());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false for non-tablet viewport", async () => {
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsTablet());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});

describe("useIsSmallDesktop", () => {
  it("returns true for small desktop viewport", async () => {
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsSmallDesktop());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false for non-small desktop viewport", async () => {
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsSmallDesktop());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});

describe("useIsDesktop", () => {
  it("returns true for desktop viewport", async () => {
    window.matchMedia = createMatchMediaMock(true);

    const { result } = renderHook(() => useIsDesktop());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("returns false for non-desktop viewport", async () => {
    window.matchMedia = createMatchMediaMock(false);

    const { result } = renderHook(() => useIsDesktop());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
