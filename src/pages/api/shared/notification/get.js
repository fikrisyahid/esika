import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/api-response";
import middleware from "@/utils/middleware-api";
import { prisma } from "@/utils/prisma";

export default async function handler(req, res) {
  const allowed = await middleware({ req, res, method: "GET" });
  if (!allowed.pass) {
    return res.status(allowed.statusCode).json(allowed);
  }

  try {
    const { user_id: userId } = req.query;

    if (!userId) {
      throw new Error("user_id is required");
    }

    const unreadNotification = await prisma.notifikasi.findMany({
      where: {
        userId,
        read: false,
      },
    });

    const readNotification = await prisma.notifikasi.findMany({
      where: {
        userId,
        read: true,
      },
    });

    return SUCCESS_RESPONSE({
      res,
      data: {
        unread: unreadNotification,
        read: readNotification,
      },
    });
  } catch (error) {
    return ERROR_RESPONSE({ res, message: error.message });
  }
}
