import { Schema, Types, model } from 'mongoose';

interface ICommentSchema {
    body: string;
    upvotes: number;
    downvotes: number;
    post: Types.ObjectId;
    owner: Types.ObjectId;
}

const commentSchema = new Schema<ICommentSchema>({
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
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
});

const Comment = model<ICommentSchema>('Comment', commentSchema);

export default Comment;
