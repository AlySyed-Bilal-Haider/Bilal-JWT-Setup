import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { users } from "../db.js";
export const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log("request", req.body);
  let user = users.find((user) => {
    return user.email === email;
  });

  if (user) {
    return res.status(422).json({
      message: "Email already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    email,
    password: hashedPassword,
  });

  const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", {
    expiresIn: 360000,
  });

  res.json({
    token,
  });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if user with email exists

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(422).json({
      message: "Invalid email",
    });
  }

  // Check if the password if valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }
  console.log("login successfully");
  const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", {
    expiresIn: 360000,
  });

  res.json({
    token,
  });
};
