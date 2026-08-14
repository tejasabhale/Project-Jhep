export const passwordResetTemplate = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Password Reset</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f3f4f6;
    font-family:Arial, Helvetica, sans-serif;
    color:#111827;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background-color:#f3f4f6;
      padding:40px 16px;
    "
  >
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:520px;
            background-color:#ffffff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color:#2563eb;
                padding:28px 32px;
                text-align:center;
              "
            >
              <h1
                style="
                  margin:0;
                  color:#ffffff;
                  font-size:24px;
                  font-weight:700;
                "
              >
                Password Reset
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#dbeafe;
                  font-size:14px;
                "
              >
                Reset your password securely
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:36px 32px;">

              <p
                style="
                  margin:0 0 16px;
                  font-size:16px;
                  color:#374151;
                "
              >
                Hello,
              </p>

              <p
                style="
                  margin:0 0 20px;
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                "
              >
                We received a request to reset the password for your
                account. Click the button below to create a new password.
              </p>

              <!-- Reset Button -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td align="center" style="padding:12px 0 28px;">

                    <a
                      href="${resetLink}"
                      style="
                        display:inline-block;
                        padding:14px 28px;
                        background-color:#2563eb;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:8px;
                        font-size:15px;
                        font-weight:700;
                      "
                    >
                      Reset Password
                    </a>

                  </td>
                </tr>
              </table>

              <!-- Expiry Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    style="
                      background-color:#eff6ff;
                      border:1px solid #bfdbfe;
                      border-radius:10px;
                      padding:16px;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        font-size:13px;
                        line-height:1.6;
                        color:#1e40af;
                      "
                    >
                      <strong>This link expires in 10 minutes.</strong>
                      For your security, please reset your password
                      before the link expires.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Fallback Link -->
              <p
                style="
                  margin:24px 0 8px;
                  font-size:13px;
                  color:#6b7280;
                "
              >
                If the button above doesn't work, copy and paste the
                following link into your browser:
              </p>

              <p
                style="
                  margin:0;
                  font-size:12px;
                  line-height:1.6;
                  word-break:break-all;
                  color:#2563eb;
                "
              >
                ${resetLink}
              </p>

              <!-- Security Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top:28px;"
              >
                <tr>
                  <td
                    style="
                      background-color:#f9fafb;
                      border-radius:10px;
                      padding:16px;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        font-size:13px;
                        line-height:1.6;
                        color:#6b7280;
                      "
                    >
                      <strong style="color:#374151;">
                        Didn't request a password reset?
                      </strong>
                      You can safely ignore this email. Your password
                      will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                background-color:#f9fafb;
                border-top:1px solid #e5e7eb;
                padding:20px 32px;
                text-align:center;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:12px;
                  color:#9ca3af;
                "
              >
                This is an automated email. Please do not reply.
              </p>

              <p
                style="
                  margin:6px 0 0;
                  font-size:12px;
                  color:#9ca3af;
                "
              >
                © ${new Date().getFullYear()} Project Jhep
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>

</html>
`;
