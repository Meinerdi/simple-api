import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { IExceptionFilter } from './exceptionFilter.interface';
import { HTTPError } from './httpError.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
