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
      direction,
      id_chapter: idChapter,
      id_course: idCourse,
    } = JSON.parse(req.body);

    if (!direction || !idChapter || !idCourse) {
      throw new Error("direction, id_chapter, id_course is required");
    }

    // Get current chapter position
    const currentChapter = await prisma.chapter.findFirst({
      where: {
        id: idChapter,
      },
      select: {
        position: true,
      },
    });

    // If direction is up, update the previous chapter position if exist
    if (direction === "up") {
      const previousChapter = await prisma.chapter.findFirst({
        where: {
          courseId: idCourse,
          position: currentChapter.position - 1,
        },
      });

      if (previousChapter) {
        await prisma.chapter.update({
          where: {
            id: previousChapter.id,
          },
          data: {
            position: { increment: 1 },
          },
        });
      }
    }

    // If direction is down, update the next chapter position if exist
    if (direction === "down") {
      const nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId: idCourse,
          position: currentChapter.position + 1,
        },
      });

      if (nextChapter) {
        await prisma.chapter.update({
          where: {
            id: nextChapter.id,
          },
          data: {
            position: { decrement: 1 },
          },
        });
      }
    }

    // Update current chapter position
    const result = await prisma.chapter.update({
      where: {
        id: idChapter,
      },
      data: {
        position: direction === "up" ? { decrement: 1 } : { increment: 1 },
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully update chapter",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
