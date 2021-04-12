import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from '../../../domain/user/User';

export class UserModel extends Model {
	public id!: string;
	public email!: string;
	public passwordHash!: string;
	public emailVerified!: boolean;
	public refreshToken?: string;
	public firstName?: string;
	public lastName?: string;
	public avatar?: string;
	public createdAt?: Date;
	public readonly updatedAt?: Date;

	static fromEntity (user: User): UserModel {
		return new UserModel(user);
	}

	public toEntity (): User {
		return new User(this);
	}

	public static initWith (sequelize: Sequelize): void {
		UserModel.init(
			{
				id: {
					type:         DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					primaryKey:   true,
					field:        'id',
				},
				email: {
					type:      DataTypes.STRING,
					unique:    true,
					allowNull: false,
					field:     'email',
				},
				passwordHash: {
					type:      DataTypes.STRING,
					allowNull: false,
				},
				refreshToken: {
					type:      DataTypes.STRING,
					allowNull: true,
				},
				emailVerified: {
					type:         DataTypes.BOOLEAN,
					defaultValue: false,
					field:        'email_verified',
				},
				firstName: {
					type:      DataTypes.STRING,
					allowNull: true,
					field:     'first_name',
				},
				lastName: {
					type:      DataTypes.STRING,
					allowNull: true,
					field:     'last_name',
				},
				avatar: {
					type:      DataTypes.STRING,
					allowNull: true,
					field:     'avatar',
				},
				createdAt: {
					type:         DataTypes.DATE,
					defaultValue: new Date(),
					allowNull:    false,
					field:        'created_at',

				},
				updatedAt: {
					type:         DataTypes.DATE,
					defaultValue: new Date(),
					allowNull:    false,
					field:        'updated_at',
				}
			},
			{
				tableName: 'users',
				sequelize: sequelize
			}
		);
	}

	public static initRelations (): void {
		// relations
	}
}
