import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const {
      id_quiz: idQuiz,
      title,
      type,
      answer,
      Hint,
      options,
    } = JSON.parse(req.body);

    if (!idQuiz || !title || !type || !answer) {
      throw new Error("id_quiz, title, type, answer is required");
    }

    // Find latest question position
    const latestQuestion = await prisma.question.findFirst({
      where: {
        quizId: idQuiz,
      },
      orderBy: {
        position: "desc",
      },
    });

    const result = await prisma.question.create({
      data: {
        quizId: idQuiz,
        title,
        type,
        answer,
        Hint,
        options,
        position: latestQuestion ? latestQuestion.position + 1 : 1,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create quiz",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
