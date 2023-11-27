import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: "POST",
    roles: "ADMIN",
    anonymous: true,
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { name, email, password, role } = JSON.parse(req.body);

    if (!name || !email || !password || !role) {
      throw new Error("name, email, password, role is required");
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
        name,
        email,
        password: await hash(password, 10),
      },
    });

    if (role === "mahasiswa") {
      await prisma.mahasiswa.create({
        data: {
          userId: result.id,
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
