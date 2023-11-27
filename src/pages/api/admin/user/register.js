import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "ADMIN",
    anonymous: true,
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { name, username, password, role } = JSON.parse(req.body);

    if (!name || !username || !password || !role) {
      throw new Error("name, username, password, role is required");
    }

    const exist = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (exist) {
      throw new Error("Username has already been used");
    }

    const result = await prisma.user.create({
      data: {
        name,
        username,
        role,
        user_rank: role === "TEACHER" ? "TEACHER" : "NEWBIE",
        password: await hash(password, 10),
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
