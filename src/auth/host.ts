import createHttpError from "http-errors"

export const hostOnlyMiddleware = (req: any, res: any, next: any) => {
  if (req.user.role === "host") {
    next()
  } else {
    next(createHttpError(403, "Admins only!"))
  }
}