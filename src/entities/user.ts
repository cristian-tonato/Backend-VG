import { model, Schema, Types } from 'mongoose';

export type IUser = {
    id: Types.ObjectId;
    name: string;
    nickname: string;
    email: string;
    password: string;
    favorites: Array<Types.ObjectId>;
    owner: Types.ObjectId;
    //img: string;
};
export type IProtoUser = {
    name?: string;
    nickName?: string;
    email?: string;
    password?: string;
    favotites?: Array<Types.ObjectId>;
    owner: Types.ObjectId;
    //img: string
};
export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Game',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.password;
    },
});

export const UserModel = model<IUser>('User', userSchema, 'users');
