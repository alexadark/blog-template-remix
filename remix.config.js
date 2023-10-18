/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  server: process.env.NODE_ENV === "development" ? undefined : "./server.ts",
  // serverModuleFormat: "cjs",
  // serverDependenciesToBundle: ["react-syntax-highlighter"],
};
