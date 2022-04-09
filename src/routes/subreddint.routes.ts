import { Router } from "express";
import SubredditController from "../controllers/subreddint.controller";
import { authentication } from "../middlewares/authentication";

const subreddintRouter = Router();

//create subreddint
/**
 * @swagger
 * components:
 *  schemas:
 *      Subreddint:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Subreddint's name
 *              description:
 *                  type: string
 *                  description: Subreddint's description.
 *          required:
 *              - name
 *              - description
 *          example:
 *              name: TooAfraidToAsk
 *              description: Anything and everything you’ve ever been TooAfraidToAsk.
 */

/**
 * @swagger
 * /subreddints:
 *  post:
 *      summary: Create a new Subreddint
 *      tags: [Subreddint]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Subreddint'
 *      responses:
 *          200:
 *              description: Created new Subreddint!   
 */
subreddintRouter.post('/', authentication, SubredditController.create);
//Get all Subreddints
/**
 * @swagger
 * /subreddints:
 *  get:
 *      summary: Get all subreddints
 *      tags: [Subreddint]
 *      responses:
 *          200:
 *              description: Get all Subreddints!
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Subreddint' 
 */
subreddintRouter.get('/', SubredditController.getAll);
//Get one subreddint
/**
 * @swagger
 * /subreddints/{id}:
 *  get:
 *      summary: Get one subreddint
 *      tags: [Subreddint]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Get one subreddint
 *      responses:
 *          200:
 *              description: Get one Subreddint!
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Subreddint'
 *          404: 
 *              description: Subreddint not found.
 */
subreddintRouter.get('/:id', SubredditController.getOne);
//Update one subreddint
/**
 * @swagger
 * /subreddints/{id}:
 *  put:
 *      summary: Update one subreddint
 *      tags: [Subreddint]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Update one subreddint
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Subreddint'
 *      responses:
 *          200:
 *              description: Subreddint updated!
 *          404: 
 *              description: Subreddint not found.
 */
subreddintRouter.put('/:id', authentication, SubredditController.update);
//Delete one subreddint
/**
 * @swagger
 * /subreddints/{id}:
 *  delete:
 *      summary: Delete one subreddint
 *      tags: [Subreddint]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: Delete one subreddint
 *      responses:
 *          200:
 *              description: Subreddint deleted!
 *          404: 
 *              description: Subreddint not found.
 */
subreddintRouter.delete('/:id', SubredditController.delete);
subreddintRouter.post('/:id/members/:memberid', SubredditController.addMember);
subreddintRouter.delete('/:id/members/:memberid', SubredditController.removeMember);
subreddintRouter.get('/:name/posts', SubredditController.getPosts);



export default subreddintRouter;