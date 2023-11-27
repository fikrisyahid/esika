import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({ req, res, method: "GET", roles: "dosen" });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (!id) {
        const result = await prisma.kelas.findMany({
          include: {
            dosen: true,
          },
        });

        return SUCCESS_RESPONSE({
          res,
          data: result,
        });
      }

      const result = await prisma.kelas.findUnique({
        where: {
          id,
        },
        include: {
          dosen: true,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
