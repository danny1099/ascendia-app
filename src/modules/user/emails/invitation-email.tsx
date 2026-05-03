import { Html, Head, Body } from "@react-email/components";

interface InviteEmail {
  email: string;
  inviterName: string;
  invitedEmail: string;
  teamName: string;
  inviteLink: string;
}

const IMG_LOGO_URL = `https://res.cloudinary.com/dcj1y9ka5/image/upload/v1771283046/ascendia-app/app-logo-ascendia_wrlwhu.png`;

export const InviteTemplate = ({ inviterName, invitedEmail, teamName, inviteLink }: InviteEmail) => {
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
                      You’ve been invited ✨
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
                      <strong style={{ color: "hsl(0, 0%, 4%)" }}>{inviterName}</strong> invited you to join{" "}
                      <strong style={{ color: "hsl(0, 0%, 4%)" }}>{teamName}</strong>.
                    </p>
                  </td>
                </tr>

                {/* Context */}
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
                      This is your space to collaborate, explore ideas, and build something meaningful together.
                    </p>
                  </td>
                </tr>

                {/* CTA */}
                <tr>
                  <td align="left" style={{ paddingTop: "24px" }}>
                    <a
                      href={inviteLink}
                      style={{
                        display: "inline-block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "hsl(217, 91%, 60%)",
                        textDecoration: "none",
                      }}
                    >
                      Accept invitation and join the team →
                    </a>
                  </td>
                </tr>

                {/* Extra note */}
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "13px",
                        marginTop: "20px",
                        lineHeight: "20px",
                        color: "hsl(0, 0%, 55%)",
                      }}
                    >
                      This invitation was sent to <strong>{invitedEmail}</strong>. If this doesn’t look right, you can
                      ignore this email.
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
                      See you inside,
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

                {/* Watermark */}
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
