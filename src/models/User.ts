import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    userName: string;
    password: string;
    attacker:boolean
    organization: string;
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
    attacker:{type:Boolean, required: true},
    resources: [
        {
            name: String,
            amount: Number,
        },
    ],
    budget: Number,
});

export default mongoose.model<IUser>("User", UserSchema);