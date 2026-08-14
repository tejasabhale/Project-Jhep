export const passwordChangedTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Password Changed</title>
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
                Password Changed
              </h1>

              <p
                style="
                  margin:8px 0 0;
                  color:#dbeafe;
                  font-size:14px;
                "
              >
                Your account security has been updated
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:36px 32px;">

              <!-- Success Icon -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td align="center">

                    <div
                      style="
                        width:64px;
                        height:64px;
                        margin:0 auto 24px;
                        background-color:#dcfce7;
                        border-radius:50%;
                        text-align:center;
                        line-height:64px;
                        font-size:30px;
                      "
                    >
                      ✓
                    </div>

                  </td>
                </tr>
              </table>

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
                Your account password was changed successfully.
                You can now use your new password to sign in to your
                account.
              </p>

              <!-- Security Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top:8px;"
              >
                <tr>
                  <td
                    style="
                      background-color:#fff7ed;
                      border:1px solid #fed7aa;
                      border-radius:10px;
                      padding:16px;
                    "
                  >
                    <p
                      style="
                        margin:0 0 6px;
                        font-size:14px;
                        font-weight:700;
                        color:#9a3412;
                      "
                    >
                      Security Alert
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:13px;
                        line-height:1.6;
                        color:#7c2d12;
                      "
                    >
                      If you did not make this change, your account
                      may be at risk. Please contact support immediately
                      and secure your account.
                    </p>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin:28px 0 0;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                  text-align:center;
                "
              >
                For your security, never share your password with
                anyone.
              </p>

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