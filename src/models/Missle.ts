import mongoose, { Document, Schema } from "mongoose"

export interface IMissle extends Document {
    name:string
    description:string
    speed:number
    intercepts:string[]
    price:number
}

const MissleSchema = new Schema<IMissle>({
    name: String,
    description: String,
    speed: Number,
    intercepts: [String],
    price: Number
})

export default mongoose.model<IMissle>("Missle", MissleSchema)