import { AppError } from '../../app/AppError';
import { GoogleAuth } from '../../infra/provider/google/GoogleAuth';
import { IUserRepository } from './IUserRepository';
import { ISignUpInput } from './types';
import { User } from './User';
import bcrypt from 'bcrypt';
import { Config } from '../../app/Config';

export class UserService {

	constructor (private googleAuth: GoogleAuth, private userRepository: IUserRepository, private config: Config) {}

	public async authUserByGoogle (token: string): Promise<User> {
		const googleUser = await this.googleAuth.authUserByToken(token);
		if (!googleUser) {
			throw new AppError('WRONG TOKEN', 'User not found');
		}
		const user = await this.userRepository.create(new User(googleUser));
		return user;
	}

	public async signUp (input: ISignUpInput): Promise<void> {
		const salt = bcrypt.genSaltSync(this.config.crypto.saltRounds);
		const hash = bcrypt.hashSync(input.password, salt);
		console.log(hash);
		return;
	}
}
