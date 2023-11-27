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
    const { id: idCourse, title, description } = JSON.parse(req.body);
    if (!idCourse || !title || !description) {
      throw new Error("id, title, description is required");
    }
    const result = await prisma.course.update({
      where: {
        id: idCourse,
      },
      data: {
        title,
        description,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully update course",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
