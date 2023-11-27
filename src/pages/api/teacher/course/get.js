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
    const { id: courseId, search } = req.query;

    // If id is not provided, get all courses
    if (!courseId) {
      // Get all courses
      const result = await prisma.course.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully fetched all courses",
      });
    }

    if (!courseId) {
      throw new Error("id is required");
    }

    // Get course by id
    const result = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        Chapter: {
          orderBy: {
            position: "asc",
          },
        },
        Course_Progress: true,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully fetched course by id",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
