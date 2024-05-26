import { Request, Response, NextFunction } from 'express';

// Model
import { Note } from '../model/noteModel';
import { GlobalEnumStatus } from '../util/globalEnum';

// Util
import { AppError } from '../util/appError';
import { catchAsync } from '../util/catchAsync';
import { Op } from 'sequelize';


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


export const searchNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.params;
    const notes = await Note.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { body: { [Op.like]: `%${search}%` } },
        ],
      },
      attributes: ['id', 'title', 'body', 'date'],
    });
    res.status(GlobalEnumStatus.OK).json({
      status: 'success',
      results: notes.length,
      data: {
        notes,
      },
    });
})


export const fromDate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('entro',req.params);
    const { toDate, fromDate } = req.params;

    if (!fromDate || !toDate) {
      return next(new AppError('Missing parameters', GlobalEnumStatus.BAD_REQUEST));
    }

    const notes = await Note.findAll({
      where: {
        date: {
          [Op.between]: [fromDate, toDate],
        },
      },
      attributes: ['id', 'title', 'body', 'date'],
    });
    res.status(GlobalEnumStatus.OK).json({
      status: 'success',
      results: notes.length,
      data: {
        notes,
      },
    });
})


export const createNote = catchAsync(async (req: Request, res: Response, next: NextFunction) => {       
    const { title, body, date } = req.body;
    const newNote = await Note.create({
      title,
      body,
      date,
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



