import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
}

const OrganizationSchema = new Schema<IOrganization>({
    name: String,
    resources: [
        {
            name: String,
            amount: Number,
        },
    ],
    budget: Number,
});

export default mongoose.model<IOrganization>("Organization", OrganizationSchema);