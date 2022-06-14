import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config(); //получение данных из .env
		if (result.error) {
			this.logger.error('Не удалось прочитать файл .env или он отсутствует');
		} else {
			this.logger.log('[ConfigServise] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput; //парсинг данных из .env
		}
	}
	get(key: string): string {
		return this.config[key]; //получение значения по ключу
	}
}
