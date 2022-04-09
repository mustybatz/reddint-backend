import { Request, Response } from "express";
import Subreddint from "../models/Subreddint.model";
import Post from "../models/Posts.model";
import { Schema, Types } from 'mongoose';


const SubredditController = { 
    getAll: async (req: Request, res: Response) => {
        try {
            const subreddints = await Subreddint.find();
            res.status(200).json(subreddints);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const subreddint = await Subreddint.findById(req.params.id);
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    create: async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.userId;

            console.log(userId);

            const subreddint = new Subreddint({
                name: req.body.name,
                description: req.body.description,
                owner: userId,
                members: [userId]
            });
            await subreddint.save();
            res.status(201).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    update: async (req: Request, res: Response) => {
        try {

            const userId = req.body.user.userId;

            const match = await Subreddint.findById(req.params.id);

            if(!match) {
                return res.status(404).json({
                    message: 'Subreddint not found'
                });
            }

            if(match.owner.toString() !== userId) {
                return res.status(401).json({
                    message: 'You are not authorized to update this subreddint'
                });
            }

            const subreddint = await Subreddint.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            await Subreddint.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Subreddint deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    },
    addMember: async (req: Request, res: Response) => {
        try {
            const subreddint = await Subreddint.findById(req.params.id);

            if (!subreddint) {
                return res.status(404).json({ message: 'Subreddint not found' });
            }

            subreddint.members.push(new Types.ObjectId(req.body.userId));
            await subreddint.save();
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    removeMember: async (req: Request, res: Response) => {
        try {
            const subreddint = await Subreddint.findById(req.params.id);

            if (!subreddint) {
                return res.status(404).json({ message: 'Subreddint not found' });
            }

            const index = subreddint.members.indexOf(new Types.ObjectId(req.body.memberid));
            subreddint.members.splice(index, 1);
            await subreddint.save();
            res.status(200).json(subreddint);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getPosts: async (req: Request, res: Response) => {
        try {
            const { name } = req.params;

            const subreddint = await Subreddint.findOne({ name });

            if (!subreddint) {
                return res.status(404).json({ message: 'Subreddint not found' });
            }

            const posts = await Post.find({ subreddint: subreddint._id });

            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
};

export default SubredditController;