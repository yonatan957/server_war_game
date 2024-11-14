import mongoose, { Schema } from "mongoose";

export interface IAttack {
    organization: string;
    name: string;
    tymeToHit: number;
    id_attacker: string;
    id_intercepted?: string;
    intercepted: boolean;
}

const attackSchema = new Schema<IAttack>({
    name: String,
    tymeToHit: Number,
    id_attacker: String,
    id_intercepted: String,
    intercepted: Boolean,
    organization: String
});

export default mongoose.model<IAttack>("Attack", attackSchema)