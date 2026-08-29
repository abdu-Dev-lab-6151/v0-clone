import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. ለሕዝብ ክፍት የሆኑ መንገዶችን እዚህ እንመድባለን (የአዲሱን /:path* ሕግ በመጠቀም)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in/:path*",
  "/sign-up/:path*",
  "/api/:path*", // Inngest እና E2B APIs ክፍት እንዲሆኑ
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. መንገዱ public ካልሆነ (ለምሳሌ /dashboard ከሆነ) ተጠቃሚው የግድ Login ማድረግ አለበት
  if (!isPublicRoute(req)) {
    const authObj = await auth(); // authን await ማድረግ እንዳትረሳ
    authObj.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
