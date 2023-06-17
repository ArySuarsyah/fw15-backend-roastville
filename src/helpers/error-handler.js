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
  if (err?.message?.includes("auth_code_invalid")) {
    return res.status(404).json({
      success: false,
      message: "auth_code_invalid",
    })
  }
  if (err?.message?.includes("auth_no_forgot_request")) {
    return res.status(404).json({
      success: false,
      message: "auth_no_forgot_request",
    })
  } else {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
