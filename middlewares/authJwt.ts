import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import HeadMaster from "../models/HeadMasters";
import Teacher from "../models/Teachers";

declare global {
  namespace Express {
    interface Request {
      userId?: Record<string, any>;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(
    token.toString(),
    "this is a secret key token",
    (err: VerifyErrors | null, decoded: object | undefined) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded;
      next();
    }
  );
};

const isHeadMaster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const result = await HeadMaster.findById(userId!.id);
  if (!result) {
    res.status(401).json({ message: "Require HeadMaster Role!" });
    return;
  }
  next();
  return;
};

const isTeacher = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req;
  const result = await Teacher.findById(userId!.id);
  if (!result) {
    res.status(401).json({ message: "User Not Found!" });
    return;
  }
  next();
  return;
};

const authJwt = {
  verifyToken,
  isHeadMaster,
  isTeacher,
};

export default authJwt;
