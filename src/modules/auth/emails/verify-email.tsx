import { Body, Head, Html } from "@react-email/components";
import { env } from "@/config/env";

interface EmailVerification {
  token: string;
}

const IMG_LOGO_URL = `https://res.cloudinary.com/dcj1y9ka5/image/upload/v1771283046/ascendia-app/app-logo-ascendia_wrlwhu.png`;

export const VerifyEmail = ({ token }: EmailVerification) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "hsl(0, 0%, 100%)",
          margin: "0 auto",
        }}
      >
        <table width="100%" cellPadding="0" cellSpacing="0" border={0} style={{ padding: "10px", margin: "0 auto" }}>
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{ margin: "0 auto", padding: "20px 0" }}
              >
                {/* Logo */}
                <tr>
                  <td align="left" style={{ padding: "20px 0" }}>
                    <img src={IMG_LOGO_URL} alt="Ascendia Logo" width="40" height="40" />
                  </td>
                </tr>

                {/* Heading */}
                <tr>
                  <td>
                    <h1
                      style={{
                        fontSize: "32px",
                        lineHeight: "42px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        color: "hsl(0, 0%, 4%)",
                      }}
                    >
                      Welcome to Ascendia
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "15px 0 0 0",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      We're glad you’re stepping into this journey with us. 💫
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "20px 0 0 0",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      You’re about to step into a space designed to help you make better decisions, understand complex
                      systems, and grow as a leader through real, meaningful experiences.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "20px 0 0 0",
                        padding: "0",
                        lineHeight: "20px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      Before you get started, there’s just one quick step left:
                    </p>
                    <a
                      href={`${env.APP_HOST_URL}/auth/verify-email?token=${token}`}
                      style={{
                        fontSize: "12px",
                        marginTop: "-4px",
                        lineHeight: "0",
                        fontWeight: 600,
                        color: "hsl(217, 91%, 60%)",
                        textDecoration: "none",
                      }}
                    >
                      Please verify your email to activate your account.
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "30px",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      Once you confirm, you’ll be ready to explore simulations, create workspaces, and begin shaping
                      your own leadership path.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "20px",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      If you didn’t create this account, feel free to ignore this message.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ marginTop: "40px" }}>
                    <p
                      style={{
                        marginTop: "40px",
                        display: "flex",
                        flexDirection: "column",
                        fontSize: "14px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      Warmly,
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "hsl(0, 0%, 4%)",
                        margin: "0",
                      }}
                    >
                      The Ascendia Team
                    </p>
                  </td>
                </tr>

                {/* Outro */}
                <tr>
                  <td style={{ paddingTop: "40px" }}>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "hsl(0, 0%, 55%)",
                        margin: 0,
                        lineHeight: "16px",
                      }}
                    >
                      ©2025 Ascendia Inc. a Dale company. <br />
                      San Francisco, USA
                    </p>
                    <p
                      style={{
                        marginTop: "20px",
                        fontSize: "11px",
                        color: "hsl(0, 0%, 55%)",
                      }}
                    >
                      All rights reserved.
                    </p>
                  </td>
                </tr>

                {/* Marca de agua */}
                <tr>
                  <td style={{ position: "relative", height: "1px" }}>
                    <table
                      width="600"
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        opacity: 0.1,
                      }}
                    >
                      <tr>
                        <td align="right" style={{ paddingRight: "10px" }}>
                          <img src={IMG_LOGO_URL} width="120" alt="Ascendia Watermark" style={{ display: "block" }} />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
};
