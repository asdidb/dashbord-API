/*
main - точка входа в приложение
создает новый экземпляр App и запускает инициализацию App
*/
import { App } from "./app";
import { ExceptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";

async function bootstrap() {//начальная загрузка
    const logger = new LoggerService();
    const app = new App(
        logger, new UserController(logger),
        new ExceptionFilter(logger)
    );//простейшая dependency injection
    await app.init();
}
bootstrap();