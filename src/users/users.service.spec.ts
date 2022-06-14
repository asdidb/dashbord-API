import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserService } from './user.service';
import { IUserService } from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

//mock объект
const ConfigServiceMock: IConfigService = {
	get: jest.fn(), //создание mock функции
};
//mock объект
const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(), //создание mock функции
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		//имитация возврата для mock функции
		configService.get = jest.fn().mockReturnValueOnce('1');
		//имитация имплементации для mock функции
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'Vasya',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1); //проверка значения
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser - sucsess', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'a@a.ru',
			password: '1',
		});
		expect(res).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'a5@a.ru',
			password: '3',
		});
		expect(res).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: 'a2@a.ru',
			password: '2',
		});
		expect(res).toBeFalsy();
	});
});
