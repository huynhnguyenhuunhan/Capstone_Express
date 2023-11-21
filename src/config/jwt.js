import jwt from "jsonwebtoken";

// Tạo Token
export const createToken = (data) =>
  jwt.sign({ data }, "CAPSTONEBE", {
    algorithm: "HS256",
    expiresIn: "1h",
  });

// Kiểm tra Token
export const checkToken = (token) => jwt.verify(token, "CAPSTONEBE");

// Giải mã Token
export const decodeToken = (token) => jwt.decode(token);

// Ủy quyền cho user
export const grantToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log("token", token);
    checkToken(token);
    next();
  } catch (error) {
    return res.status(401).send("Bạn không có quyền thực hiện");
  }
};
