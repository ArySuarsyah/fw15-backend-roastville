export default function errorHandler(res, err) {
  if (err?.message?.includes("auth_wrong_password")) {
    return res.status(404).json({
      success: false,
      message: "auth_wrong_password",
    })
  }
  if (err?.message?.includes("auth_no_email")) {
    return res.status(404).json({
      success: false,
      message: "auth_no_email",
    })
  }
  if (err?.message?.includes("auth_no_user")) {
    return res.status(404).json({
      success: false,
      message: "auth_no_user",
    })
  }
  if (err?.message?.includes("auth_forgot_password_fail")) {
    return res.status(404).json({
      success: false,
      message: "auth_forgot_password_fail",
    })
  }

  if (err?.message?.includes("auth_forgot_password_duplicate")) {
    return res.status(409).json({
      success: false,
      message: "email already send request",
    })
  }

  if (err?.message?.includes("auth_code_invalid")) {
    return res.status(404).json({
      success: false,
      message: "auth_code_invalid",
    })
  }

  if (err?.message?.includes("Update_profile_failed")) {
    return res.status(404).json({
      success: false,
      message: "File to large",
    })
  }

  if (err?.message?.includes("auth_no_forgot_request")) {
    return res.status(404).json({
      success: false,
      message: "auth_no_forgot_request",
    })
  }
  if (err?.message?.includes("forgot_request_email_key")) {
    return res.status(404).json({
      success: false,
      message: "email has been request reset password",
    })
  }
  if (err?.message?.includes("fileformat_error")) {
    return res.status(400).json({
      success: false,
      message: "Error: File format is not valid",
    })
  } else {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
