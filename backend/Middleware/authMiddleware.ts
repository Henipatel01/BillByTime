import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  console.log("AUTH MIDDLEWARE HIT");

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token
    // const token = authHeader.split(" ")[1];
    const token = authHeader.replace("Bearer ", "").trim();
    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
