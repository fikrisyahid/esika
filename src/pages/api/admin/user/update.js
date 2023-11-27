import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "admin",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { id, name, username, password, role } = JSON.parse(req.body);

    if (!id || !name || !username || !role) {
      throw new Error("id, name, username, role is required");
    }

    const exist = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (exist) {
      throw new Error("Username has already been used");
    }

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        role,
        password: await hash(password, 10),
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully update user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
