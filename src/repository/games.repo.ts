import { GamesModel, IGames } from '../entities/games.js';
import { id, GamesRepo } from './repo.js';

export class GamesRespository implements GamesRepo<IGames> {
    static instance: GamesRespository;

    public static getInstance(): GamesRespository {
        if (!GamesRespository.instance) {
            GamesRespository.instance = new GamesRespository();
        }
        return GamesRespository.instance;
    }
    #Model = GamesModel;

    async getAll(): Promise<Array<IGames>> {
        console.log('getAll', this.getAll);
        const result = this.#Model.find();
        return result;
    }
    async get(id: id): Promise<IGames> {
        console.log('getRepo', id);
        const result = await this.#Model.findById(id);

        if (!result) throw new Error('Not found id');
        return result;
    }

    async create(data: Partial<IGames>): Promise<IGames> {
        return await this.#Model.create(data);
    }

    async query(key: string, value: string): Promise<Array<IGames>> {
        const result = await this.#Model.find({ [key]: value });
        return result as Array<IGames>;
    }

    async update(id: id, data: Partial<IGames>): Promise<IGames> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result;
    }

    async delete(id: id): Promise<id> {
        await this.#Model.findByIdAndDelete(id);

        return id;
    }
}
