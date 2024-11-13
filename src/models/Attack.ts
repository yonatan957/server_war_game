import mongoose, { Schema } from "mongoose";

export interface IAttack {
    name: string;
    tymeToHit: number;
    intercepts: string[];
    id_attacker: string;
    id_intercepted?: string;
}

const attackSchema = new Schema<IAttack>({
    name: String,
    tymeToHit: Number,
    intercepts: [String],
    id_attacker: String,
    id_intercepted: String,
});

export default mongoose.model<IAttack>("Attack", attackSchema)