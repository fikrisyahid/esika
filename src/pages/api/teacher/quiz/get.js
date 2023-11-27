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
    const { id: quizId, search, without_chapter: withoutChapter } = req.query;

    // If id is not provided, get all quizzes
    if (!quizId) {
      // Get all quizzes
      const result = await prisma.quiz.findMany({
        where: {
          title: {
            contains: search,
            mode: "insensitive",
          },
          ...(withoutChapter === "true" && {
            Chapter: null,
          }),
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Chapter: {
            select: {
              id: true,
              title: true,
              course: {
                select: {
                  id: true,
                  title: true,
                  published: true,
                },
              },
            },
          },
          _count: {
            select: {
              Question: true,
              Students: true,
            },
          },
        },
      });
      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully fetched all quizzes",
      });
    }

    if (!quizId) {
      throw new Error("id is required");
    }

    // Get quiz by id
    const result = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        Chapter: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
                published: true,
              },
            },
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        Question: {
          orderBy: {
            position: "asc",
          },
        },
        Quiz_Result: true,
        Quiz_Comment: true,
        Students: true,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully fetched quiz by id",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
