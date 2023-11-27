import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({ req, res, method: ["GET"] });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    if (req.method === "GET") {
      const { email } = req.query;

      // If there is no email provided, get the current user
      if (!email) {
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
      }

      const result = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          Mahasiswa: true,
          Dosen: true,
          Admin: true,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully get user",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
