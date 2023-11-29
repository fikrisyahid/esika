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
      const {
        kelas_id: kelasId,
        judul,
        deskripsi,
        file,
      } = JSON.parse(req.body);

      if (!kelasId || !judul || !deskripsi || !file) {
        throw new Error("kelas_id, judul, deskripsi, file is required");
      }

      const result = await prisma.materi.create({
        data: {
          kelasId,
          judul,
          deskripsi,
          file,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully added materi",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
