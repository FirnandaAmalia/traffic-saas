import createMiddleware from "next-intl/middleware";

const middleware = createMiddleware({
  locales: ["id", "en"],
  defaultLocale: "id",
});

export default function proxy(request: any) {
  console.log("PATH:", request.nextUrl.pathname);

  return middleware(request);
}
export const config = {
  matcher: [
    "/",
    "/(id|en)/:path*"
  ],
};