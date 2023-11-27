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
      title,
      content,
      video_link: videoLink,
      course_id: courseId,
    } = JSON.parse(req.body);

    if (!title || !content || !courseId) {
      throw new Error("title, content, course_id is required");
    }

    // Find latest chapter position in courseID
    const latestChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    // Create chapter
    const result = await prisma.chapter.create({
      data: {
        title,
        content,
        video_link: videoLink,
        courseId,
        position: latestChapter ? latestChapter.position + 1 : 1,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create chapter",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
