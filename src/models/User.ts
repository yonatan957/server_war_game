import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    userName: string;
    password: string;
    organization: string;
    location?: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
}

const UserSchema = new Schema<IUser>({
    userName: {type:String, required: true},
    password: {type:String, required: true},
    organization: {type:String, required: true},
    location: String,
    resources: [
        {
            name: String,
            amount: Number,
        },
    ],
    budget: Number,
});

export default mongoose.model<IUser>("User", UserSchema);