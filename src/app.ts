/*
App - класс приложения
*/
import express, { Express } from 'express';
import { userRouter } from './users/users';
import {Server} from 'http';
export class App {
    app: Express;
    server: Server;
    port: number;
    constructor() {
        this.app = express();
        this.port = 8000;
    }
    useRouts(){
        this.app.use('/users', userRouter)
    }
    public async init() {//метод инициализации приложения
        this.useRouts();
        this.server=this.app.listen(this.port);
        console.log(`Сервер запущен на http://localhost:${this.port}`);

    }
}