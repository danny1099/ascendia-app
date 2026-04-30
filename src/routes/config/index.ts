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
      tenant: {
        prefix: "[organization]",
        routes: {
          main: {
            prefix: "/m",
            routes: {
              overview: "/overview",
            },
          },
          hub: {
            prefix: "/[workspace]",
            routes: {
              dashboard: "/dashboard",
            },
          },
        },
      },
    },
  },
} as const;
