import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  const allowed = await middleware({
    req,
    res,
    method: ["GET", "PUT"],
    roles: "TEACHER",
  });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  const { method } = req;

  try {
    if (method === "GET") {
      const { id } = req.query;

      if (!id) {
        const { search } = req.query;

        const result = await prisma.user.findMany({
          where: {
            role: "STUDENT",
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return SUCCESS_RESPONSE({
          res,
          data: result,
          message: result
            ? "successfully get students"
            : "students does not exist",
        });
      }

      const result = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!result) {
        throw new Error("student does not exist");
      }

      return SUCCESS_RESPONSE({
        res,
        data: result,
        message: "successfully get student",
      });
    }

    // If method === "PUT"
    const { id } = req.query;

    if (!id) {
      throw new Error("id is required");
    }

    const { password } = JSON.parse(req.body);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: await hash(password, 10),
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: result,
      message: "successfully update student",
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
