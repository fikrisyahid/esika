import { ADMIN_PAGE } from "@/configs";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const UnauthorizedResponse = {
  statusCode: 401,
  status: "failed",
  message: "You're not authorized",
  data: null,
};

const ForbiddenMethodResponse = {
  statusCode: 405,
  status: "failed",
  message: "Method not allowed",
  data: null,
};

/**
 *
 * @param req http req
 * @param res http res
 * @param method "METHOD" | ["METHOD", "METHOD"]
 * @param roles "TEACHER" | STUDENT | ["TEACHER", "STUDENT"]
 * @param anonymous set to true to make public endpoint
 * @returns
 */
export default async function middleware({
  req,
  res,
  method,
  roles,
  anonymous,
}) {
  const session = await getServerSession(req, res, authOptions);
  const AdminAPI = roles === "admin" || roles?.includes("admin");

  if (!anonymous && !session) {
    return UnauthorizedResponse;
  }

  if (session && !anonymous) {
    const role = session.user?.Admin
      ? "admin"
      : session.user?.Dosen
      ? "dosen"
      : session.user?.Mahasiswa
      ? "mahasiswa"
      : "";
    const allowedRoles = roles === role || roles?.includes(role);
    if (roles && !allowedRoles && !AdminAPI) {
      return UnauthorizedResponse;
    }
  }

  if (AdminAPI) {
    const { pass } = req.query;
    const { validation } = ADMIN_PAGE;
    if (pass !== validation) {
      return UnauthorizedResponse;
    }
  }

  const allowedMethod = method === req.method || method?.includes(req.method);
  if (method && !allowedMethod) {
    return ForbiddenMethodResponse;
  }

  return {
    statusCode: 200,
    pass: true,
    session,
  };
}
