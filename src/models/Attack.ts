import mongoose, { Schema } from "mongoose";

export interface IAttack {
    name: string;
    tymeToHit: number;
    id_attacker: string;
    id_intercepted?: string;
}

const attackSchema = new Schema<IAttack>({
    name: String,
    tymeToHit: Number,
    id_attacker: String,
    id_intercepted: String,
});

export default mongoose.model<IAttack>("Attack", attackSchema)