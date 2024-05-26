import express from "express";

// Middlewares
import {
    checkValidations,
    createNoteValidation,
} from "../middlewares/validationsMiddlewares";

import {protectToken} from "../middlewares/authMiddlewares";

// Controllers
import {
    getAllNotes,
    getNote,
    searchNote,
    fromDate,
    createNote,
    updateNote,
    deleteNote,
} from "../controller/noteController";

const router = express.Router();

// Routes


// Apply protectToken middleware
//router.use(protectToken);

router.post("/", createNoteValidation, checkValidations, createNote);  
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.get("/search/:search", searchNote);
router.get("/fromDate/:fromDate/toDate/:toDate", fromDate);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// swagger docs
/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: The notes managing API
 * /api/v1/notes:
 *   get:
 *     summary: Lists all the notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: The list of the notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/note'
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              body: 
 *                type: string
 *              date:
 *                type: string
 *                format: date
 *                example: "2022-01-01"
 *     responses:
 *       200:
 *         description: The created note.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/note'
 *       500:
 *         description: Some server error
 * /api/v1/notes/search/{search}:
 *   get:
 *     summary: Get the note of search by title and body
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: search by title and body
 *     responses:
 *       200:
 *         description: The note response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/note'
 *       404:
 *         description: The note was not found
 * /api/v1/notes/fromDate/{fromDate}/toDate/{toDate}:
 *   get:
 *     summary: get notes from this date
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: fromDate
 *         schema:
 *           type: date
 *           format: date
 *           example: "2022-01-01"
 *         description: get notes from this date
 *       - in: path
 *         name: toDate
 *         schema:
 *           type: date
 *           format: date
 *           example: "2024-12-31"
 *     responses:
 *       200:
 *         description: The note response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/note'
 *       404:
 *         description: The note was not found
 * /api/v1/notes/{id}:
 *   get:
 *     summary: Get the note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: The note response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/note'
 *       404:
 *         description: The note was not found
 *   put:
 *    summary: Update the note by id
 *    tags: [Notes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The note id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              body:
 *                type: string
 *    responses:
 *      200:
 *        description: The note was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/note'
 *      404:
 *        description: The note was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note id
 *
 *     responses:
 *       200:
 *         description: The note was deleted
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