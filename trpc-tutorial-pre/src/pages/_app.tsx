import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : `http://localhost:3000/api/trpc`;

    // make it faster and easier to debug
    // the order matters
    const links = [
      loggerLink(), // log == easier debug
      httpBatchLink({
        // make faster
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
        headers() {
          if (ctx?.req) {
            return {
              ...ctx.req.headers, // add ctx to header cookies ??
              "x-ssr": "1", // req is done on the server
            };
          }
          return {};
        },
      },
      links,
      transformer: superjson, // transformer is superjson
    };
  },
  ssr: false, // we want to see the network requests on the browser network tab
})(MyApp);
