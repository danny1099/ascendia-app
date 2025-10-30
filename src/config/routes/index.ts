export const publicRoutes = {
  Home: "/",
  GetStarted: "/auth/get-started",
  SignIn: "/auth/sign-in",
};

export const privateRoutes = {
  Onboarding: "/private/onboarding",
  Overview: "/private/t/:tenant/overview",
  Workspaces: "/private/t/:tenant/ws",
};

export type PublicRoute = keyof typeof publicRoutes;
export type PrivateRoute = keyof typeof privateRoutes;

export const getPublicRoute = (route: PublicRoute): string => publicRoutes[route];
export const getPrivateRoute = ({ route, segment }: { route: PrivateRoute; segment?: string }): string => {
  const routePath = privateRoutes[route];
  if (segment) return routePath.replace(":tenant", segment);
  return routePath;
};
