import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	//получение типа method из значений из нового интерфейса, созданного с помощью утилитарного типа Pick
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	//упрощенное создание типа method
	//method: 'get' | 'post' | 'delete' | 'patch' | 'put';
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
