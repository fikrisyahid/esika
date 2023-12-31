import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: ["GET", "POST", "DELETE", "PUT"],
    roles: "admin",
    anonymous: true,
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (id) {
        const result = await prisma.user.findUnique({
          where: {
            id,
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

      const result = await prisma.user.findMany({
        include: {
          Mahasiswa: true,
          Dosen: true,
          Admin: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully get users",
      });
    }

    if (req.method === "POST") {
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
    }

    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        throw new Error("id is required");
      }

      const result = await prisma.user.delete({
        where: {
          id,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully delete user",
      });
    }

    if (req.method === "PUT") {
      const { id } = req.query;
      const { nama } = JSON.parse(req.body);

      if (!id) {
        throw new Error("id is required");
      }

      if (!nama) {
        throw new Error("nama is required");
      }

      const result = await prisma.user.update({
        where: {
          id,
        },
        data: {
          nama,
        },
      });

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully update user",
      });
    }

    throw new Error("Method not allowed");
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
