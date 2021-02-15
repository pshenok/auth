import { AppError } from '../../app/AppError';
import { GoogleAuth } from '../../infra/provider/google/GoogleAuth';
import { IUserRepository } from './IUserRepository';
import { User } from './User';

export class UserService {

	constructor (private googleAuth: GoogleAuth, private userRepository: IUserRepository) {}

	public async authUserByGoogle (token: string): Promise<User> {
		const googleUser = await this.googleAuth.authUserByToken(token);
		if (!googleUser) {
			throw new AppError('WRONG TOKEN', 'User not found');
		}
		const user = await this.userRepository.create(new User(googleUser));
		return user;
	}
}
