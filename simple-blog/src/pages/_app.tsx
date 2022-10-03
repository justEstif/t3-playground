import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import "../styles/globals.css";
import { getBaseUrl } from "../utils/constants";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" || // enabled if dev
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          maxBatchSize: 10,
          url,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },

      // set the headers
      headers: () => {
        if (ctx?.req) {
          const headers = ctx?.req?.headers;
          delete headers?.connection;
          return {
            ...headers, // add our headers to the req into the server
            "x-ssr": "1", // req is done on the server
          };
        }
        return {};
      },

      transformer: superjson, // move functioning json
    };
  },
  ssr: false, // we want to see the requests on the network tab
})(MyApp);
