import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({ req, res, method: "GET", roles: "ADMIN" });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { id } = req.query;

    if (!id) {
      throw new Error("id is required");
    }

    const result = await prisma.user.delete({
      where: {
        id,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully delete user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
