import { OAuth2Client, LoginTicket } from 'google-auth-library';
import { Config } from '../../../app/Config';
import { GoogleUser } from './types';

export class GoogleAuth {

	private clientId: string;
	private client: OAuth2Client;

	constructor (private config: Config) {
		this.clientId = this.config.infra.google.clientId;
		this.client = new OAuth2Client(this.clientId);
	}

	public async authUserByToken (token: string): Promise<GoogleUser | null> {
		const ticket: LoginTicket = await this.client.verifyIdToken({
			idToken:  token,
			audience: this.clientId,
		});

		const user = ticket.getPayload();

		if (!user) {
			return null;
		}

		return {
			email:         user.email!,
			firstName:     user.given_name!,
			lastName:      user.family_name!,
			emailVerified: Boolean(user.email_verified),
			avatar:        user.picture,
		};
	}
}
