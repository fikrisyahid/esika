import {
  ERROR_RESPONSE,
  SUCCESS_RESPONSE,
} from "@/utils/api-response";
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
    const { title, description, teacher_id: teacherId } = JSON.parse(req.body);
    if (!title || !description || !teacherId) {
      throw new Error("title, description, teacher_id is required");
    }
    const result = await prisma.course.create({
      data: {
        title,
        description,
        teacherId,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create course",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
