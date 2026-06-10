import { Request, Response } from 'express';

export function getStatus(_req: Request, res: Response) {
  res.json({
    ok: true,
    message: 'API Associação Digital está rodando.',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
