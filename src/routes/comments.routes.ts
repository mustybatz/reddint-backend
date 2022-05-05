import { Router } from "express";
import CommentsController from "../controllers/comments.controller";
import { authentication } from "../middlewares/authentication";

const commentRouter = Router();

/** Create comment 
 * @swagger
 * components:
 *  schemas:
 *      CreateComment:
 *          security:
 *             - bearerAuth: []
 *          type: object
 *          properties:
 *              body:
 *                  type: string
 *                  description: Comment body
 *              post_id:
 *                  type: string
 *                  description: Post id where the comment belongs
 *          
 *          required:
 *              - email
 *              - password
 *          example:
 *              body: 🎉 Your post sucks 🎉
 *              post_id: 5e9f8f8f8f8f8f8f8f8f8f8
 */

/**
 * @swagger
 * /comments:
 *  post:
 *      summary: Create a new Comment
 *      tags: [Comment]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CreateComment'
 *                  
 *      responses:
 *          200:
 *              description: Logged in!
 *          404:
 *              description: Wrong credentials.   
 */
commentRouter.post('/', authentication, CommentsController.create);

/**
 * @swagger
 * 
 * /comments/{post_id}:
 *  get:
 *      summary: Get all comments of a post
 *      tags: [Comment]
 *      parameters:
 *          - in: path
 *            name: post_id
 *            schema:
 *              type: string
 *              required: true
 * 
 */
commentRouter.get('/:post_id', CommentsController.getAll);


/**
 * @swagger
 * 
 * /comments/upvote/{comment_id}:
 *  put:
 *     summary: Upvote a comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        name: comment_id
 *        schema:
 *        type: string
 *        required: true
 */
commentRouter.put('/upvote/:comment_id', CommentsController.vote('upvote'));

/**
 * @swagger
 * 
 * /comments/downvote/{comment_id}:
 *  put:
 *     summary: Downvote a comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        name: comment_id
 *        schema:
 *        type: string
 *        required: true
 */
commentRouter.put('/downvote/:comment_id', CommentsController.vote('downvote'));


export default commentRouter;
