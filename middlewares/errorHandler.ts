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
      case "NOT_FOUND_PARENT":
        code = 404;
        message = "Parent Data Not Found!";
        break;
      case "NOT_FOUND_TEACHER":
        code = 404;
        message = "Teacher Data Not Found!";
        break;
      case "NOT_FOUND_HOMEROOM":
        code = 404;
        message = "Homeroom Teacher Data Not Found!";
        break;
      case "NOT_FOUND_SCORE":
        code = 404;
        message = "Score Student Data Not Found!";
        break;
      case "NOT_FOUND_COURSE":
        code = 404;
        message = "Course Data Not Found!";
        break;
      case "NOT_FOUND_YEAR":
        code = 404;
        message = "Year Academic Data Not Found!";
        break;
      case "NOT_FOUND_SCHEDULE":
        code = 404;
        message = "Schedule Data Not Found!";
        break;
      case "NOT_FOUND_CLOCK":
        code = 404;
        message = "Clock Data Not Found!";
        break;
      case "NOT_FOUND_SCHEDULE":
        code = 404;
        message = "Schedule Data Not Found!";
        break;
      case "NOT_FOUND_SEMESTER":
        code = 404;
        message = "Semester Data Not Found!";
        break;
      case "NOT_FOUND_SEARCH":
        code = 404;
        message = "Data Searching Not Found!";
        break;
      case "RANGE_TEST_SCORE":
        code = 400;
        message = "Range Test Score Between 0 - 100 Score!";
        break;
      case "NOT_FOUND":
        code = 404;
        message = "FORM NULL! Fill The Form Because That REQUIRED TO FILL!";
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
