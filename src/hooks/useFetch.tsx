import React, { useEffect, useReducer, useRef } from "react";
import { HOST } from "../contants";

interface State<T> {
  data?: T;
  error?: Error;
  isLoading?: boolean;
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

export const getUrlPath = (path: string, query?: Record<string, any>) =>
  path?.startsWith("/")
    ? `https://${HOST}/api${path}${(query && "?") || ""}${new URLSearchParams({
        ...query,
      })}`
    : String(path);

function useFetch<T = unknown>(
  path?: string,
  options?: RequestInit & { query?: Record<string, string> }
): State<T> {
  const [cache, setCache] = React.useState<{
    [key: string]: { value: T; expiredAt: number };
  }>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    isLoading: true,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return { ...initialState, data: action.payload, isLoading: false };
      case "error":
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!path) return;

    const url = getUrlPath(path, options?.query);

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });
      const reqOptions = {
        method: "GET",
        ...options,
        headers: {
          "Content-Type": "application/json",
          "User-Agent": navigator.userAgent,
          ...options?.headers,
        },
      };

      // If a cache exists for this url, return it
      const aliveCache = Object.keys(cache)
        .filter((url) => {
          return cache[url].expiredAt > Date.now();
        })
        .reduce((acc, url) => ({ ...acc, [url]: cache[url] }), {});
      setCache(aliveCache);

      try {
        let data: any;
        if (
          cache[url] &&
          cache[url].expiredAt >= Date.now() &&
          reqOptions.method === "GET"
        ) {
          data = cache[url].value;
        } else {
          const response = await fetch(url, reqOptions);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          data = await response.json();
        }

        if (reqOptions.method === "GET") {
          setCache({
            [url]: {
              value: data,
              expiredAt: Date.now() + 60 * 1000, // expired after 1 minutes
            },
          });
        }
        if (cancelRequest.current) return;
        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return state;
}

export default useFetch;
