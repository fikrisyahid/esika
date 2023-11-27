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

    const target = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!target) {
      throw new Error("user not found");
    }

    if (target.role !== "STUDENT") {
      throw new Error("only student can be deleted");
    }

    const result = await prisma.user.delete({
      where: {
        id,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully delete student",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
