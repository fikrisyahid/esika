import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "DELETE",
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { id } = req.query;

    if (!id) {
      throw new Error("id is required");
    }

    const exists = await prisma.quiz.findUnique({
      where: {
        id,
      },
    });

    if (!exists) {
      throw new Error("quiz not found");
    }

    const result = await prisma.quiz.delete({
      where: {
        id,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully delete quiz",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
