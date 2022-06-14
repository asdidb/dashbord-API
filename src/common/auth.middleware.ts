import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token: string = req.headers.authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					if (typeof payload == 'object' && payload.email) {
						req.user = payload.email;
						next();
					}
				}
			});
		} else {
			next();
		}
	}
}
