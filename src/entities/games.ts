import { model, Schema, Types } from 'mongoose';

export type IGames = {
    id: Types.ObjectId;
    title: string;
    img: string;
    description: string;
    gameUrl: string;
    creator: string;
    genre: string;
    //owner: Types.ObjectId;
};
export type IProtoGames = {
    titile?: string;
    img?: string;
    description?: string;
    gameUrl?: string;
    creator?: string;
    genre?: string;
    //owner?: Types.ObjectId;
};
export const gameSchema = new Schema<IGames>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gameUrl: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Games',
    // },
});

gameSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});

export const GamesModel = model<IGames>('Game', gameSchema, 'games');
