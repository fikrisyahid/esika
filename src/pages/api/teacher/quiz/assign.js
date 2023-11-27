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
      chapter_id: chapterId,
      delete_assign: deleteAssign,
    } = JSON.parse(req.body);

    // If wants to delete assign chapter from quiz
    if (deleteAssign) {
      if (!idQuiz) {
        throw new Error("id is required to delete chapter from quiz");
      }
      const result = await prisma.quiz.update({
        where: {
          id: idQuiz,
        },
        data: {
          Chapter: {
            disconnect: true,
          },
        },
      });
      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully delete chapter from quiz",
      });
    }

    // If wants to assign chapter to quiz, then idQuiz and chapterId are required
    if (!idQuiz || !chapterId) {
      throw new Error("id, chapter_id are required to assign quiz");
    }

    const result = await prisma.quiz.update({
      where: {
        id: idQuiz,
      },
      data: {
        Chapter: {
          connect: {
            id: chapterId,
          },
        },
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully assigned chapter to quiz",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
