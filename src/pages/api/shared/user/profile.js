import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "GET",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { id } = allowed.session.user;
    const result = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Admin: true,
        Dosen: true,
        Mahasiswa: true,
      },
    });
    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully get user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
