import { NextFunction, Request, Response } from "express";

export function errorHandler (e: Error, _req: Request, res: Response, _next: NextFunction) {
  if (e?.message?.toLowerCase().includes('not found')) {
    return res.status(404).json({
      code: 404,
      message: e?.message,
      status: 'not found'
    });
  }
  return res.status(500).json({
    code: 500,
    message: e?.message,
    status: 'error'
  });
}
