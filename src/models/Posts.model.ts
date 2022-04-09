import { Schema, Types, model } from 'mongoose';

interface IPostSchema {
    title: string;
    body: string;
    upvotes: number;
    downvotes: number;
    subreddint: Types.ObjectId;
    owner: Types.ObjectId;
}

const postSchema = new Schema<IPostSchema>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    subreddint: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subreddint',
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
});

const Post = model<IPostSchema>('Post', postSchema);

export default Post;
