export const otpTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Email Verification</title>
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
    style="background-color:#f3f4f6;padding:40px 16px;"
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
                Email Verification
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#dbeafe;
                  font-size:14px;
                "
              >
                Verify your email address to continue
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
                  margin:0 0 24px;
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                "
              >
                Use the verification code below to verify your email
                address. This code is valid for
                <strong style="color:#111827;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      background-color:#eff6ff;
                      border:1px solid #bfdbfe;
                      border-radius:12px;
                      padding:22px;
                    "
                  >
                    <div
                      style="
                        font-size:32px;
                        font-weight:700;
                        letter-spacing:8px;
                        color:#2563eb;
                      "
                    >
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin:24px 0 0;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                  text-align:center;
                "
              >
                Please do not share this verification code with anyone.
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
                        Security Notice:
                      </strong>
                      If you did not request this verification code,
                      you can safely ignore this email.
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
