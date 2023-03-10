import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { GamesModel } from '../entities/games';
import { GamesRespository } from './games.repo.js';

const mock = [
    {
        title: 'SuperMario',
        img: 'http://ulr',
        description: 'SuperHero',
        gameUrl: 'http://www.mario.com',
        creator: 'Pepe',
        genre: 'Action',
    },
    {
        title: 'SuperMario2',
        img: 'http://ulr',
        description: 'SuperHero and Luigi',
        gameUrl: 'http://www.marioandLuigi.com',
        creator: 'Pepebot',
        genre: 'Action',
    },
];
describe('Given the ProductRepository', () => {
    const repository = GamesRespository.getInstance();
    let testIds: Array<string>;

    beforeAll(async () => {
        await dbConnect();
        await GamesModel.deleteMany();
        await GamesModel.insertMany(mock);
        const data = await GamesModel.find();
        testIds = [data[0].id, data[1].id];
    });

    describe('When we instantiate it', () => {
        test('Then getAll should have been called', async () => {
            const result = await repository.getAll();
            expect(result[0].title).toEqual(mock[0].title);
        });

        test('Then get should have been called', async () => {
            const result = await repository.get(testIds[0]);
            expect(result.title).toEqual(mock[0].title);
        });
        test('Then get should have been called', async () => {
            const result = await repository.get(testIds[0]);
            expect(result.title).toEqual(mock[0].title);
        });
        test('Then get should have been called', async () => {
            expect(async () => {
                await repository.get('537b422da27b69c98b1916e1');
            }).rejects.toThrow();
        });
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
});
