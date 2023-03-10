import { passwordEncrypt } from '../services/auth.js';
import { IUser, UserModel } from '../entities/user.js';
import { UserRepo, id } from './repo.js';

export class UserRepository implements UserRepo<IUser> {
    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }
    #Model = UserModel;

    async get(id: id): Promise<IUser> {
        const result = await this.#Model.findById(id).populate('favorites');
        if (!result) throw new Error('Not found id');
        return result;
    }
    async create(data: Partial<IUser>): Promise<IUser> {
        if (typeof data.password !== 'string') throw new Error('No info found');
        data.password = await passwordEncrypt(data.password);
        const result = await this.#Model.create(data);
        return result;
    }

    async post(data: Partial<IUser>): Promise<IUser> {
        data.password = await passwordEncrypt(data.password as string);
        const result = await this.#Model.create(data);
        return result;
    }

    async find(search: Partial<IUser>): Promise<IUser> {
        const result = await this.#Model.findOne(search).populate('favorites');
        console.log(result, 'RESULT');
        if (!result) throw new Error('Not found id ');
        return result as IUser;
    }
    async update(id: id, data: Partial<IUser>): Promise<IUser> {
        const result = await this.#Model
            .findByIdAndUpdate(id, data, {
                new: true,
            })
            .populate('favorites');

        return result as IUser;
    }

    async destroy(id: id): Promise<{ id: id }> {
        await this.#Model.findByIdAndDelete(id);
        return { id: id };
    }
}
