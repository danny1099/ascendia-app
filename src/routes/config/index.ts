export const routes = {
  public: {
    prefix: "/",
    routes: {
      home: "",
      auth: {
        prefix: "auth",
        routes: {
          sign_in: "/sign-in",
          get_started: "/get-started",
          forgot_password: "/forgot-password",
          verify_email: "/verify-email",
        },
      },
    },
  },

  private: {
    prefix: "/",
    routes: {
      onboarding: "onboarding",
      invitation: {
        prefix: "invitations",
        routes: {
          invited: "/[invitation]",
        },
      },
      tenant: {
        prefix: "[organization]",
        routes: {
          main: {
            prefix: "/m",
            routes: {
              overview: "/overview",
              organizations: "/organizations",
              workspaces: "/workspaces",
              users: "/users",
              scenarios: "/scenarios",
            },
          },
          hub: {
            prefix: "/[workspace]",
            routes: {
              dashboard: "/dashboard",
              simulations: "/simulations",
            },
          },
        },
      },
    },
  },
} as const;
