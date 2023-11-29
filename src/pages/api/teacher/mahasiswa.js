import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: ["GET", "POST", "DELETE", "PUT"],
    roles: "dosen",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    if (req.method === "GET") {
      const { id, kelas_id: kelasId } = req.query;

      if (id) {
        const result = await prisma.mahasiswa.findUnique({
          where: {
            id,
          },
        });

        return SUCCESS_RESPONSE({
          res,
          data: result,
          message: "successfully get mahasiswa by id",
        });
      }

      if (kelasId) {
        const result = await prisma.mahasiswa.findMany({
          where: {
            Nilai: {
              every: {
                kelasId: {
                  not: kelasId,
                },
              },
            },
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return SUCCESS_RESPONSE({
          res,
          data: result,
          message: "successfully get mahasiswa by kelas_id",
        });
      }

      const result = await prisma.mahasiswa.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully get mahasiswa",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
