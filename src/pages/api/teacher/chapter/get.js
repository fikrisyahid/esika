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
    const { id, draft_only: draftOnly, without_quiz: withoutQuiz } = req.query;

    if (!id) {
      // Fetch all chapters made by the teacher
      const result = await prisma.chapter.findMany({
        where: {
          course: {
            author: {
              id: allowed.session.user.id,
            },
            ...(draftOnly === "true" && { published: false }),
          },
          ...(withoutQuiz === "true" && { quizId: null }),
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully fetched all chapters made by the teacher",
      });
    }

    // Fetch chapter by id
    const result = await prisma.chapter.findUnique({
      where: {
        id,
      },
      include: {
        Quiz: {
          select: {
            id: true,
            title: true,
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            published: true,
          },
        }
      }
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully fetched chapter by id",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
