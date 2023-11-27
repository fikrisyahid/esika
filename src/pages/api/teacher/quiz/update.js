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
      id: idQuiz,
      title,
      timeLimit,
      minimumScore,
      difficulty,
    } = JSON.parse(req.body);

    if (!idQuiz || !title || !difficulty) {
      throw new Error("id, title, and difficulty are required to create quiz");
    }

    const result = await prisma.quiz.update({
      where: {
        id: idQuiz,
      },
      data: {
        title,
        time_limit: timeLimit === 0 ? null : timeLimit,
        minimum_score: minimumScore === 0 ? null : minimumScore,
        quiz_difficulty: difficulty,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully updated quiz",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
