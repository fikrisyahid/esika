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
      id_chapter: idChapter,
      title,
      content,
      video_link: videoLink,
      course_id: courseId,
    } = JSON.parse(req.body);

    if (!title || !content || !courseId) {
      throw new Error("title, content, course_id is required");
    }

    // Update chapter
    const result = await prisma.chapter.update({
      where: {
        id: idChapter,
      },
      data: {
        title,
        content,
        video_link: videoLink,
        courseId,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully edit chapter",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
