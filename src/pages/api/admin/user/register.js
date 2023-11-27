import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "admin",
    anonymous: true,
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { nama, email, password, role } = JSON.parse(req.body);

    if (!nama || !email || !password || !role) {
      throw new Error("nama, email, password, role is required");
    }

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist) {
      throw new Error("Email has already been used");
    }

    const result = await prisma.user.create({
      data: {
        nama,
        email,
        password: await hash(password, 10),
      },
    });

    if (role === "mahasiswa") {
      let NIM = "";

      const latestNIM = await prisma.mahasiswa.findFirst({
        orderBy: {
          NIM: "desc",
        },
      });

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();

      if (!latestNIM) {
        NIM = `${currentYear}${currentMonth}${currentDay}001`;
      }
      if (latestNIM) {
        const latestNIMNumber = parseInt(latestNIM.NIM.slice(-3));
        const currentNIMNumber = latestNIMNumber + 1;
        const currentNIMString = currentNIMNumber.toString().padStart(3, "0");
        NIM = `${currentYear}${currentMonth}${currentDay}${currentNIMString}`;
      }

      await prisma.mahasiswa.create({
        data: {
          userId: result.id,
          NIM,
        },
      });
    }

    if (role === "dosen") {
      await prisma.dosen.create({
        data: {
          userId: result.id,
        },
      });
    }

    if (role === "admin") {
      await prisma.admin.create({
        data: {
          userId: result.id,
        },
      });
    }

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully create user",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
