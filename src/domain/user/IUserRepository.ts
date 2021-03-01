import { IListStructure } from '../domain.types';
import { User } from './User';

export interface IFindUserInput {
	id?: string;
	text?: string;
	email?: string;
}

export interface IUserRepository {
	create(user: User): Promise<User>;
	get(input: IFindUserInput): Promise<User | null>;
	list(input: IFindUserInput): Promise<IListStructure<User>>;
}
