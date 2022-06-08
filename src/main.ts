/*
main - точка входа в приложение
создает новый экземпляр App и запускает инициализацию App
*/
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { App } from './app';
import { ExceptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/user.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

//использование ContainerModule из inversify для создания модуля зависимостей
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});
function bootstrap(): IBootstrapReturn {
	const appContainer = new Container(); //из inversify
	appContainer.load(appBindings); //добавление набора биндингов к контейнеру
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}
export const { app, appContainer } = bootstrap();
