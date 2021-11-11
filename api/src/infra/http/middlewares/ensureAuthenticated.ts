import { NextFunction, Request, Response } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import jwt from '../../../configs/jwt';
import { UsersRepositoryMongoose } from '../../../modules/users/infra/mongoose/repositories/UsersRepositoryMongoose';
import { UnauthozitedError } from '../../errors/UnauthozitedError';

type ITokenPlayload = {
  sub: string;
};

type ITokenSubject = {
  user_id: string;
};

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthozitedError('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, String(jwt.secret)) as ITokenPlayload;

    const { user_id } = JSON.parse(sub) as ITokenSubject;

    const usersRepository = new UsersRepositoryMongoose();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new UnauthozitedError('Usuário não encontrado');
    }

    request.user = {
      user_id,
    };

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthozitedError('Sua sessão expirou', 'expired_error');
    }

    // console.log(error);

    throw new UnauthozitedError('Token inválido');
  }
}
