import { Response } from "express";

export class ResponseService {
  
  success = (res: Response, message: string, data?: Record<string, any>) => res.status(200).json({
    code: 200,
    message,
    status: 'success',
    data
  });

  created = (res: Response, message: string, data?: Record<string, any>) => res.status(201).json({
    code: 201,
    message,
    status: 'success',
    data
  });

  notFound = (res: Response, message?: string) => res.status(404).json({
    code: 404,
    status: 'not found',
    message
  });

  failed = (res: Response, code: number = 500, message: string) => res.status(code).json({
    code,
    status: 'failed',
    message
  });

  unauthorized = (res: Response, message: string = 'Access unauthorized!') => res.status(401).json({
    code: 401,
    status: 'unauthorized',
    message
  });

  forbidden = (res: Response, message: string = 'Access denied!') => res.status(403).json({
    code: 403,
    status: 'forbidden',
    message
  });
  
}
