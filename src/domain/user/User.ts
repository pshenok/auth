import uuid from 'uuid';

export class User {

	public id: string;
	public email: string;
	public passwordHash: string;
	public emailVerified: boolean;
	public refreshToken?: string;
	public firstName?: string;
	public lastName?: string;
	public avatar?: string;

	constructor (init: Partial<User>) {
		this.id            = init.id || uuid.v4();
		this.email         = init.email!;
		this.passwordHash  = init.passwordHash!;
		this.refreshToken  = init.refreshToken;
		this.emailVerified = init.emailVerified || false;
		this.firstName     = init.firstName;
		this.lastName      = init.lastName;
		this.avatar        = init.avatar;
	}
}
