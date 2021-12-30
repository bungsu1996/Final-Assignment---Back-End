import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

class errorHandler {
    static errHandle(
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let name: string = err.name;
        let code: number = 0;
        let message: string = "";

        switch (name) {
            case "NOT_FOUND_CLASS":
                code = 404;
                message = "Class Data Not Found!";
                break;
            case "NOT_FOUND_STUDENT":
                code = 404;
                message = "Student Data Not Found!";
                break;
            case "NOT_FOUND_TEACHER":
                code = 404;
                message = "Teacher Data Not Found!";
                break;
            case "NOT_FOUND_SCORE":
                code = 404;
                message = "Score Data Not Found!";
                break;
            case "NOT_FOUND_COURSE":
                code = 404;
                message = "Course Data Not Found!";
                break;
            default:
                code = 500;
                message = "Internal Server Error";
                break;
        }
        res.status(code).json({ Success: false, Message: message });
    }
}

export { errorHandler };
