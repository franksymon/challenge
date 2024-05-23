import { Request, Response, NextFunction } from 'express';
import { hashSync, genSaltSync } from 'bcryptjs';


// Model
import { User } from '../model/userModel';
import { GlobalEnumStatus } from '../util/globalEnum';

// Util
import { AppError } from '../util/appError';
import { catchAsync } from '../util/catchAsync';


export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'usuario', 'email'],
    });

    res.status(GlobalEnumStatus.OK).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  });
  

export const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return next(new AppError('User not found', GlobalEnumStatus.NOT_FOUND));
      } else {
        res.status(GlobalEnumStatus.OK).json({
          status: 'success',
          data: {
            user,
          },
        });
      }
  });


export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, usuario, email, password } = req.body;
    
    const salt =  genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    
    const newUser = await User.create({
      firstName,
      lastName, 
      usuario,
      email,
      password: hashedPassword,
    });
    res.status(GlobalEnumStatus.CREATED).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  });  


export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { firstName, lastName, usuario, email, password } = req.body;
    const salt =  genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    
    const user = await User.findByPk(id);
    if (!user) {
      return next(new AppError('User not found', GlobalEnumStatus.NOT_FOUND));
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.usuario = usuario;
      user.email = email;
      user.password = hashedPassword;
      await user.save();
      res.status(GlobalEnumStatus.OK).json({
        status: 'success',
        data: {
          user,
        },
      });
    } 
  });


export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return next(new AppError('User not found', GlobalEnumStatus.NOT_FOUND));
    } else {
      await user.destroy();
      res.status(GlobalEnumStatus.NO_CONTENT).json({
        status: 'success',
        data: null,
      });
    }
  });

