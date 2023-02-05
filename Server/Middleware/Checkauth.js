import jwt from "jsonwebtoken";
export const token = async (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log("token here:", token);
  if (!token) {
    res.status(401).json({
      msg: "No token found",
    });
  }
  try {
    const user = await jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g932");
    req.user = user.email;
    next();
  } catch (error) {
    res.status(400).json({
      msg: "Invalid Token",
    });
  }
};
