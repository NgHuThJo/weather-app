import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { z } from "zod";
import { routeTree } from "#frontend/routeTree.gen";
import { CapitalizeFirstLetter } from "#frontend/shared/utils/string";
import "#frontend/assets/styles";

z.setErrorMap((iss, ctx) => {
  const formattedPath = iss.path.map((value) => {
    if (typeof value === "number") {
      return `[${value}]`;
    }

    return CapitalizeFirstLetter(value);
  });

  if (iss.code === "too_small") {
    return {
      message: `${formattedPath.join("")} is too small, minimum is ${iss.minimum}`,
    };
  }

  if (iss.code === "too_big") {
    return {
      message: `${formattedPath.join("")} is too big, maximum is ${iss.maximum}`,
    };
  }

  return {
    message: ctx.defaultError,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.state.data !== undefined) {
        console.error(`Something went wrong: ${error.message}`);
      }
    },
  }),
});
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root");
if (!root) {
  throw new ReferenceError("DOM root not found");
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
