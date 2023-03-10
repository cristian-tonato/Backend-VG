import mongoose from 'mongoose';
import { dbConnect } from '../db.conect';
import { UserModel } from '../entities/user';
import { GamesRespository } from './games.repo';
import { UserRepository } from './user.repository';

describe('Given UserRepository', () => {
    const mockData = [
        {
            userName: 'Juan01',
            name: 'Pepe',
            lastName: 'Lopez',
            email: 'juan@gmail.com',
            password: 'a2a2a2',
        },
        {
            userName: 'Pepebot',
            name: 'Pepe',
            lastName: 'Palacios',
            email: 'pepebo@gmail.com',
            password: 'a1a1a1',
        },
    ];

    const userRepo = UserRepository.getInstance();
    GamesRespository.getInstance();
    let testIds: Array<string>;

    beforeEach(async () => {
        await dbConnect();
        await UserModel.deleteMany();
        await UserModel.insertMany(mockData);
        const data = await UserModel.find();
        testIds = [data[0].id, data[1].id];
    });

    describe('When we instantiate get()', () => {
        test('Then it should return an user', async () => {
            const result = await userRepo.get(testIds[0]);
            expect(result.name).toEqual(mockData[0].name);
        });

        test('and receives an invalid id, it should return an error', async () => {
            expect(async () => {
                await userRepo.get(testIds[4]);
            }).rejects.toThrowError();
        });
    });

    describe('When we instantiate post()', () => {
        test('Then it should return a new user', async () => {
            const newUser = {
                name: 'Ramiro',
                password: '123',
                email: 'rams@gmail.com',
            };
            await userRepo.create(newUser);
            expect(newUser.name).toEqual('Ramiro');
        });

        test('and receives an invalid data it should return an error', async () => {
            expect(async () => {
                await userRepo.create({ password: testIds[2] });
            }).rejects.toThrow();
        });
    });

    describe('When we instantiate find()', () => {
        test('Then it should return one user', async () => {
            await userRepo.find(mockData[0]);
            expect(mockData[0].name).toEqual('Pepe');
        });

        test('and receives an invalid id it should return an error', async () => {
            expect(async () => {
                await userRepo.find(mockData[5]);
            }).rejects.toThrowError(Error);
        });
    });

    describe('When we instantiate update()', () => {
        test('Then it should return one user', async () => {
            await userRepo.update(testIds[0], mockData[0]);
            expect(mockData[0].name).toEqual('Pepe');
        });

        test('and receives an invalid id it should return an error', async () => {
            expect(async () => {
                await userRepo.update(testIds[4], mockData[1]);
            }).rejects.toThrowError();
        });
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });
});
