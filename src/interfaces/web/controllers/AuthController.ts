import joi from '../../../app/Validator';
import { Request } from 'express';
import { handler } from '../decorators';
import { UserService } from '../../../domain/user/UserService';

export class AuthController {
	constructor (private userService: UserService) {}

	@handler({
		description: 'Auth with Google',
		method:      'POST',
		path:        '/auth/google',
		validate:    {
			body: joi.object().keys({
				token: joi.string()
			})
		},
		response: {
			200: joi.object().keys({
				data: joi.object().keys({
					token: joi.string().required()
				})
			})
		}
	})
	public async authUserByGoogle (req: Request): Promise<Partial<object>> {
		const user = await this.userService.authUserByGoogle(req.body.token);
		return user; // Add types
	}

	@handler({
		description: 'Sign up new user',
		method:      'POST',
		path:        '/auth/signup',
		validate:    {
			body: joi.object().keys({
				token: joi.string()
			})
		},
		response: {
			200: joi.object().keys({
				data: joi.object().keys({
					token: joi.string().required()
				})
			})
		}
	})
	public async signUpUser (req: Request): Promise<Partial<object>> {
		await this.userService.signUp({
			email:    req.body.email,
			password: req.body.password
		});
		return {
			email:    req.body.email,
			password: req.body.password
		}; // Add types
	}
}
