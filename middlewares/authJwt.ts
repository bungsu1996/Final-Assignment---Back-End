import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { isToken } from "typescript";
import HeadMaster from "../models/HeadMasters";
import Parent from "../models/Parents";
import Student from "../models/Students";
import Teacher from "../models/Teachers";

declare global {
  namespace Express {
    interface Request {
      userId?: Record<string, any>;
    }
  }
}

class auth {
  static authentication(req: Request, res: Response, next: NextFunction) {
    try {
      // const token = req.headers.authorization?.split(" ")[1];
      const token = req.header('Authorization')!.replace('Bearer ','');
      // console.log(token)
      if (!token) {
        throw { name: "MISSING_TOKEN" };
      }
      const decodedToken = <any>jwt.verify(token, "this is a secret key token");
      req.userId = <any>{ email: decodedToken.email, id: decodedToken.id };
      next();
    } catch (error) {
      res.status(401).json({ Message: "You Are Not Authenticated!" });
    }
  }

  static async isHeadmaster(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const result = await HeadMaster.findById(userId?.id);
        if (!result) {
          res.status(401).json({ message: "Require HeadMaster Role!" });
          return;
        }
        next();
        return;
    } catch (error) {
      res.status(401).json({ Message: "You Are Not Authorized!" })
    }
  }

  static async isTeacher(req: Request, res: Response, next: NextFunction) {
    const { userId } = req;
    try {
      const result = await Teacher.findById(userId?.id);
        if (!result) {
          res.status(401).json({ message: "Require Teacher Role!" });
          return;
        }
        next();
        return;
    } catch (error) {
      res.status(401).json({ Message: "You Are Not Authorized!" })
    }
  }
}

export default auth;

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   // const token = req.headers.authorization?.split(" ")[1];
//   const token = req.header('Authorization')!.replace('Bearer','').split(" ")[1];
//   console.log(req.header)
//   console.log(token)
//   if (!token) {
//     return res.status(403).send({ message: "No token provided!" });
//   }

//   jwt.verify(
//     token.toString(),
//     "this is a secret key token",
//     (err: VerifyErrors | null, decoded: object | undefined) => {
//       if (err) {
//         console.log(err);
//         return res.status(401).send({ message: "Unauthorized!" });
//       }
//       req.userId = decoded;
//       console.log(decoded)
//       next();
//     }
//   );
// };

// const isHeadMaster = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { userId } = req;
//   console.log(userId);
//   const result = await HeadMaster.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Require HeadMaster Role!" });
//     return;
//   }
//   next();
//   return;
// };

// const isTeacher = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Teacher.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Teacher Not Found!" });
//     return;
//   }
//   next();
//   return;
// };

// const isStudent = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Student.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Student Not Found!" });
//     return;
//   }
//   next();
//   return;
// };

// const isParent = async (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req;
//   const result = await Parent.findById(userId?.id);
//   if (!result) {
//     res.status(401).json({ message: "Parent Not Found!" });
//     return;
//   }
//   next();
//   return;
// };

// const authJwt = {
//   verifyToken,
//   isHeadMaster,
//   isTeacher,
//   isStudent,
//   isParent,
// };

// export default authJwt;
