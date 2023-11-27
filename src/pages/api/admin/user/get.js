import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({ req, res, method: "GET", roles: "ADMIN" });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { username } = req.query;

    if (!username) {
      throw new Error("username is required");
    }

    const result = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully get user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
