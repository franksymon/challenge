import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Model
import { User } from '../model/userModel';

// Util
import { GlobalEnumStatus } from '../util/globalEnum';
import { AppError } from '../util/appError';
import { catchAsync } from '../util/catchAsync';

declare global {
    namespace Express {
      interface Request {
        sessionUser?: User; // Assuming 'User' is the type of your user object
      }      
    }
}

interface CustomRequest extends Request {
    userData: any; // Reemplaza 'any' con el tipo real de 'userData'
}
  


export const protectToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    
    // ['Bearer', 'token']
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Invalid token or session expired', GlobalEnumStatus.UNAUTHORIZED));
    }   

    const decoded = verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('User not found', GlobalEnumStatus.NOT_FOUND));
    } 
    
    // Add sessionUser to the req object
    req.sessionUser = user;
    next();
  }); 
  
  
export const isLoggedIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.sessionUser) {
      return next();
    } else {
      return next(new AppError('Invalid token or session expired', GlobalEnumStatus.UNAUTHORIZED));
    }
  });


export const userExists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    const user = await User.findByPk(id);
  
    if (!user) {
      return next(new AppError('User does not exist with given Id', GlobalEnumStatus.NOT_FOUND));
    }
  
    // Add user data to the req object
    //req.userData = user;
    (req as CustomRequest).userData = user;
    next();
  });

