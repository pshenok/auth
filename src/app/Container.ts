import 'reflect-metadata';
import { asClass, asValue, AwilixContainer, createContainer, InjectionMode } from 'awilix';
import { App } from '../app/App';
import { Logger } from '../app/Logger';
import { Config } from '../app/Config';
import { Web } from '../interfaces/web/Web';
import { UserService } from '../domain/user/UserService';
import { UserRepository } from '../infra/db/repositories/UserRepository';
import { Db } from '../infra/db/Db';
import { GoogleAuth } from '../infra/provider/google/GoogleAuth';

export class Container {
	public static create (): AwilixContainer {
		const container = createContainer({
			injectionMode: InjectionMode.CLASSIC
		});

		container.register({
			container: asValue(container),

			// App
			app:    asClass(App).singleton(),
			config: asClass(Config).singleton(),
			logger: asClass(Logger).singleton(),

			// Domain
			userService: asClass(UserService).singleton(),

			// Interfaces
			web: asClass(Web).singleton(),

			// Infra
			db:             asClass(Db).singleton(),
			userRepository: asClass(UserRepository).singleton(),
			googleAuth:     asClass(GoogleAuth).singleton()
		});

		return container;
	}

	private constructor () {
		// do nothing
	}
}
