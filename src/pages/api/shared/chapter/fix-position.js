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
    const { id_course: idCourse } = req.query;

    if (!idCourse) {
      throw new Error("id_course is required");
    }

    // Get all chapters id
    const chapters = await prisma.chapter.findMany({
      where: {
        courseId: idCourse,
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Update all chapters position
    const result = await Promise.all(
      chapters.map(async (chapter, index) => {
        const { id } = chapter;
        const position = index + 1;
        const updatedChapter = await prisma.chapter.update({
          where: {
            id,
          },
          data: {
            position,
          },
        });
        return updatedChapter;
      })
    );

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: `successfully fix chapter position in course with id ${idCourse}`,
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
