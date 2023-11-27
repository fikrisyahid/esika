import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import generateCode from "@/utils/generate-code";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: ["GET", "POST"],
    roles: "dosen",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    if (req.method === "GET") {
      const { id, dosen_id: dosenId } = req.query;

      if (id) {
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

      if (dosenId) {
        const result = await prisma.kelas.findMany({
          where: {
            dosenId,
          },
          include: {
            dosen: {
              include: {
                user: true,
              },
            },
          },
        });

        return SUCCESS_RESPONSE({
          res,
          data: result,
        });
      }

      const result = await prisma.kelas.findMany({
        include: {
          dosen: {
            include: {
              user: true,
            },
          },
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
      });
    }

    if (req.method === "POST") {
      const {
        nama,
        dosen_id: dosenId,
        komposisi_quiz: komposisiQuiz,
        komposisi_tugas: komposisiTugas,
        komposisi_uts: komposisiUTS,
        komposisi_uas: komposisiUAS,
      } = JSON.parse(req.body);

      if (
        !nama ||
        !dosenId ||
        !komposisiQuiz ||
        !komposisiTugas ||
        !komposisiUTS ||
        !komposisiUAS
      ) {
        throw new Error(
          "nama, dosen_id, komposisi_quiz, komposisi_tugas, komposisi_uts, komposisi_uas is required"
        );
      }

      let kode = "";
      let kodeUnik = false;
      while (!kodeUnik) {
        kode = generateCode();
        // eslint-disable-next-line no-await-in-loop
        const exists = await prisma.kelas.findUnique({
          where: {
            kode,
          },
        });
        if (!exists) {
          kodeUnik = true;
        }
      }

      const result = await prisma.kelas.create({
        data: {
          nama,
          dosenId,
          komposisi_quiz: komposisiQuiz,
          komposisi_tugas: komposisiTugas,
          komposisi_uts: komposisiUTS,
          komposisi_uas: komposisiUAS,
          kode,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully create kelas",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
