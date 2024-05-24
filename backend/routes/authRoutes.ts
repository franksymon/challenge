import express from "express";

// Middlewares
import {
  protectToken,
  userExists,
  isLoggedIn,
} from "../middlewares/authMiddlewares";

// Controllers
import { loginUser, updatePassword } from "../controller/authController";


export const router = express.Router();


// Routes
router.post("/login", loginUser);
router.put("/rest-password",  updatePassword);


// swagger docs
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 * /api/v1/auth/login:
 *   post:
 *     summary: login and get a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: frank@gmail.com
 *              password:
 *                type: string
 *                example: 1234
 *     responses:
 *       200:
 *         description: The Auth managing API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/note'
 * /api/v1/auth/rest-password:
 *   put:
 *     summary: Update password by user
 *     tags: [Auth]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                description: The password of your note
 *     responses:
 *       200:
 *         description: Update password by user
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/note'
 *       404:
 *         description: The note was not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     note:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: The title of your note
 *         body:
 *           type: string
 *           description: The body of your note
 *       example:
 *         id: 1
 *         title: title
 *         body: body
 */

export default router   