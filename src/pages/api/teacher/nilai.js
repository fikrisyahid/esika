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
    if (req.method === "POST") {
      const { kelas_id: kelasId, mahasiswa_id: mahasiswaId } = JSON.parse(
        req.body
      );

      const result = await prisma.nilai.create({
        data: {
          kelasId,
          mahasiswaId,
          nilai: 0,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully create nilai",
      });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;

      const result = await prisma.nilai.delete({
        where: {
          id,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully delete nilai",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
