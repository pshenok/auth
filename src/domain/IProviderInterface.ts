export interface IProviderUser {
	email: string;
	firstName: string;
	lastName: string;
	emailVerified: boolean;
	avatar?: string;
}

export interface IProviderInterface {
	authUserByToken (token: string): Promise<IProviderUser | null>;
}
