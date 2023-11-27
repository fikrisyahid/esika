import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "PUT",
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const {
      id: idQuestion,
      title,
      type,
      answer,
      Hint,
      options,
    } = JSON.parse(req.body);

    if (!idQuestion || !title || !type || !answer) {
      throw new Error("idQuestion, title, type, answer is required");
    }

    const result = await prisma.question.update({
      where: {
        id: idQuestion,
      },
      data: {
        title,
        type,
        answer,
        Hint,
        options,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully update question",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
