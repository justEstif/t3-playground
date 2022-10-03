export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url

  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // SSR should use vercel url
    : `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
