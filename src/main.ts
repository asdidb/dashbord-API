/*
main - точка входа в приложение
создает новый экземпляр App и запускает инициализацию App
*/
import { App } from "./app";

async function bootstrap() {
    const app = new App();
    await app.init();
}

bootstrap();