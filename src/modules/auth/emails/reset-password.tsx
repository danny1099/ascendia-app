import { Html, Head, Body } from "@react-email/components";

interface ResetPasswordOtpEmail {
  token: string;
}

const IMG_LOGO_URL = `https://res.cloudinary.com/dcj1y9ka5/image/upload/v1771283046/ascendia-app/app-logo-ascendia_wrlwhu.png`;

export const ResetPassword = ({ token }: ResetPasswordOtpEmail) => {
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
                      Let’s reset your password
                    </h1>
                  </td>
                </tr>

                {/* Intro */}
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
                      It happens to the best of us 🙂 Use the one-time code below to continue.
                    </p>
                  </td>
                </tr>

                {/* OTP */}
                <tr>
                  <td align="center" style={{ padding: "30px 0" }}>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      style={{
                        backgroundColor: "hsl(210, 20%, 98%)",
                        borderRadius: "6px",
                        padding: "18px 28px",
                      }}
                    >
                      <tr>
                        <td
                          style={{
                            fontSize: "28px",
                            letterSpacing: "6px",
                            fontWeight: "bold",
                            color: "hsl(0, 0%, 4%)",
                            textAlign: "center",
                          }}
                        >
                          {token}
                        </td>
                      </tr>
                    </table>

                    <p
                      style={{
                        marginTop: "12px",
                        fontSize: "12px",
                        color: "hsl(0, 0%, 55%)",
                      }}
                    >
                      This code expires in 5 minutes.
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      If you didn’t request a password reset, you can safely ignore this message. Your account is still
                      secure.
                    </p>
                  </td>
                </tr>

                {/* Footer / Firma */}
                <tr>
                  <td style={{ marginTop: "40px" }}>
                    <p
                      style={{
                        marginTop: "40px",
                        fontSize: "14px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      We’ve got you covered,
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
