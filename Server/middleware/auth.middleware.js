import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login First",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    // console.log("JWT DECODED USER:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};