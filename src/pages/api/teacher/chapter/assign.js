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
      id: idChapter,
      quiz_id: quizId,
      delete_assign: deleteAssign,
    } = JSON.parse(req.body);

    // If wants to delete assign quiz from chapter
    if (deleteAssign) {
      if (!idChapter) {
        throw new Error("id is required to delete quiz from chapter");
      }
      const result = await prisma.chapter.update({
        where: {
          id: idChapter,
        },
        data: {
          Quiz: {
            disconnect: true,
          },
        },
      });
      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully delete quiz from chapter",
      });
    }

    // If wants to assign quiz to chapter, then idChapter and quizId are required
    if (!idChapter || !quizId) {
      throw new Error("id, chapter_id are required to assign quiz");
    }

    const result = await prisma.chapter.update({
      where: {
        id: idChapter,
      },
      data: {
        Quiz: {
          connect: {
            id: quizId,
          },
        },
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully assigned quiz to chapter",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
