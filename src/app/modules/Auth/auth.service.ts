import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import jwt from "jsonwebtoken";
const loginUser = async (payload: { email: string; password: string }) => {
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );

  if (isCorrectPassword) {
    throw new Error("Password does't match");
  }

  const accessToken = jwt.sign(
    {
      id: isUserExist.id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    "abcd123",
    {
      algorithm: "ES256",
      expiresIn: "15m",
    }
  );
};

export const AuthService = { loginUser };
