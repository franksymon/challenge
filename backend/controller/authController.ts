import { Request, Response, NextFunction } from 'express';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Model
import { User } from '../model/userModel';

// Util
import { GlobalEnumStatus } from '../util/globalEnum';
import { AppError } from '../util/appError';
import { catchAsync } from '../util/catchAsync';


export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {   
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if(!user || !compareSync(password, user.password)) {
      return next(new AppError('Incorrect email or password', GlobalEnumStatus.UNAUTHORIZED));
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    user.password = 'undefined';

    res.status(GlobalEnumStatus.OK).json({
      status: 'success',
      data: {
        token,
        user,
      },    
    });
  });


export const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.params;
    const { password } = req.body;
    const salt =  genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    
    const user = await User.findByPk(userid);
    if (!user) {
      return next(new AppError('User not found', GlobalEnumStatus.NOT_FOUND));
    } else {
      const updatedUser = await user.update({
        password: hashedPassword,
      });
      res.status(GlobalEnumStatus.OK).json({
        status: 'success',
        data: {
          user: updatedUser,
        },
      });
    }   
  });

