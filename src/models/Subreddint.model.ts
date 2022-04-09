import { Schema, model, Types } from "mongoose";

interface ISubreddint {
    name: string;
    description: string;
    owner: Types.ObjectId;
    members: Types.ObjectId[];
}

const subredditSchema = new Schema<ISubreddint>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    members: [{ type: Types.ObjectId, ref: 'User' }]
});

const Subreddint = model<ISubreddint>('Subreddint', subredditSchema);   

export default Subreddint;
