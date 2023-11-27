import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "GET",
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { id: questionId } = req.query;

    if (!questionId) {
      throw new Error("questionId is required");
    }

    // Get question by id
    const result = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        Quiz_Result_Detail: true,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully fetched question by id",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
