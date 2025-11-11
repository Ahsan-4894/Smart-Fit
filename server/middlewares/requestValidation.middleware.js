import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const validateIncomingRequest = (dto) => {
  return (req, res, next) => {
    try {
      const result = dto.safeParse(req.body);
      if (!result.success) {
        const errsObj = result.error.flatten().fieldErrors;

        return res.status(StatusCodes.BAD_REQUEST).json({
          ok: false,
          message: "Validation Failed",
          error: errsObj,
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((e) => ({
          message: `${e.path.join(".")} is ${e.message}`,
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({
          ok: false,
          message: "Internal Server Error",
          error: errorMessages,
        });
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ ok: false, message: "Internal Server Error" });
      }
    }
  };
};