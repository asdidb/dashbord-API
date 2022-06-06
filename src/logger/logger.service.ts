import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
/*
LoggerService - абстракция для стандартного npm модуля tslog
которая скрывает опции настройки для модуля, а также добавляет
возможность дальнейшего расширения функционала
*/
@injectable()
export class LoggerService implements ILogger {
    public logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false
        });
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }
    error(...args: unknown[]) {
        this.logger.error(...args);
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
}