import joi from '../../../app/Validator';
import { Request } from 'express';
import { handler } from '../decorators';
import { UserService } from '../../../domain/user/UserService';

export class AuthController {
	constructor (private userService: UserService) { }

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
				email:    joi.string().required(),
				password: joi.string().required(),
			})
		},
		response: {
			200: joi.object().keys({
				data: joi.object().keys({
					accessToken: joi.string().required(),
					user:        joi.object().keys({
						id:            joi.string().required(),
						email:         joi.string().required(),
						emailVerified: joi.boolean(),
						refreshToken:  joi.string().required(),
						firstName:     joi.string().required(),
						lastName:      joi.string().required(),
						avatar:        joi.string().required(),
					})
				})
			})
		}
	})
	public async signUpUser (req: Request): Promise<Partial<object>> {
		const auth = await this.userService.signUp({
			email:    req.body.email,
			password: req.body.password
		});

		return {
			accessToken: auth.accessToken,
			user:        {
				id: auth.user.id
			}
		};
	}
}
