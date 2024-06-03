import { NextFunction, Request, Response } from "express";

export function validateRequest(
  req: Request,
  res: Response,
  next:NextFunction,
  schema: any,
  unknown: 'allowUnknown' | 'stripUnknown' = 'stripUnknown'
) {
  try {
    const options: Record<string, any> = {
      abortEarly: false, // include all errors
    };
    options[unknown] = true;
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(422).json({
        code: 422,
        message: (error.message),
        status: 'failed'
      });
    }
    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};
