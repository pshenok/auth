import { AppError } from '../../app/AppError';
import { IUserRepository } from './IUserRepository';
import { ISignUpInput } from './types';
import { User } from './User';
import bcrypt from 'bcrypt';
import { Config } from '../../app/Config';
import { IProviderInterface } from '../IProviderInterface';

export class UserService {

	constructor (private googleAuth: IProviderInterface, private userRepository: IUserRepository, private config: Config) {}

	public async authUserByGoogle (token: string): Promise<User> {
		const googleUser = await this.googleAuth.authUserByToken(token);
		if (!googleUser) {
			throw new AppError('WRONG TOKEN', 'User not found');
		}
		const user = await this.userRepository.create(new User(googleUser));
		return user;
	}

	public async signUp (input: ISignUpInput): Promise<User> {

		const currentUser = await this.userRepository.get({
			email: input.email
		});

		if (currentUser) {
			throw new AppError('ALREADY EXIST', 'User already exists');
		}

		const salt = await bcrypt.genSalt(this.config.crypto.saltRounds);
		const passwordHash = await bcrypt.hash(input.password, salt);

		const user = await this.userRepository.create(new User({
			email:        input.email,
			passwordHash: passwordHash,
		}));
		return user;
	}
}
