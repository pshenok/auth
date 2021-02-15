import { Db } from '../Db';
import { User } from '../../../domain/user/User';
import { UserModel } from '../models/UserModel';
import { IUserRepository, IFindUserInput } from '../../../domain/user/IUserRepository';
import { Op } from 'sequelize';
import { IListStructure } from '../../../domain/domain.types';

export class UserRepository implements IUserRepository {
	constructor (private db: Db) {}

	public async create (userData: User): Promise<User> {
		const user = UserModel.fromEntity(userData);

		await user.save();

		return user.toEntity();
	}

	public async list (input: IFindUserInput): Promise<IListStructure<User>> {
		const where = this.generateWhereFromInput(input);
		const users = await this.db.models.User.findAll({ where });

		return {
			total: users.length,
			items: users
		};
	}

	public async get (input: IFindUserInput): Promise<User | null> {
		const where = this.generateWhereFromInput(input);
		const user = await this.db.models.User.findOne({ where });

		return user ? user.toEntity() : null;
	}

	private generateWhereFromInput (input: IFindUserInput): Partial<object> {
		const where: any = {};
		if (input.id) {
			Object.assign(where, {
				id: input.id
			});
			return where;
		}
		if (input.text) {
			Object.assign(where, {
				[Op.or]: [
					{ firstName: { [Op.iLike]: `%${input.text}%` } },
					{ lastName: { [Op.iLike]: `%${input.text}%` } },
					{ email: { [Op.iLike]: `%${input.text}%` } }
				]
			});
		}
		return where;
	}
}
