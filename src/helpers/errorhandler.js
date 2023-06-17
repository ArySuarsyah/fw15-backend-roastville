export default function errorHandler(res, err) {
  if (err?.message?.includes("not_found")) {
    return res.status(404).json({
      success: false,
      message: "Error, data is not found",
    })
  }
}
