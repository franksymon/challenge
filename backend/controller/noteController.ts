import { Request, Response, NextFunction } from 'express';

// Model
import { Note } from '../model/noteModel';
import { GlobalEnumStatus } from '../util/globalEnum';

// Util
import { AppError } from '../util/appError';
import { catchAsync } from '../util/catchAsync';


export const getAllNotes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const notes = await Note.findAll({
      attributes: ['id', 'title', 'body'],
    });

    res.status(GlobalEnumStatus.OK).json({
      status: 'success',
      results: notes.length,
      data: {
        notes,
      },
    });
  });


export const getNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return next(new AppError('Note not found', GlobalEnumStatus.NOT_FOUND));    
    } else {
      res.status(GlobalEnumStatus.OK).json({
        status: 'success',
        data: {
          note,
        },
      });
    }
  });


export const createNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {       
    const { title, body } = req.body;
    const newNote = await Note.create({
      title,
      body,
    });
    res.status(GlobalEnumStatus.CREATED).json({
      status: 'success',
      data: {
        note: newNote,
      },
    });
  });   


export const updateNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {       
    const { id } = req.params;
    const { title, body } = req.body;
    const note = await Note.findByPk(id);
    if (!note) {
      return next(new AppError('Note not found', GlobalEnumStatus.NOT_FOUND));    
    } else {
      const updatedNote = await note.update({
        title,
        body,
      });
      res.status(GlobalEnumStatus.OK).json({
        status: 'success',
        data: {
          note: updatedNote,
        },
      });
    }
  });


export const deleteNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return next(new AppError('Note not found', GlobalEnumStatus.NOT_FOUND));
    } else {
      await note.destroy();
      res.status(GlobalEnumStatus.NO_CONTENT).json({
        status: 'success',
        data: null,
      });
    }
  });



