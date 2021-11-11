import { inject, injectable } from 'tsyringe';

import { sign } from 'jsonwebtoken';

import { UnauthozitedError } from '../../../../infra/errors/UnauthozitedError';

import { IHashProvider } from '../../../../infra/providers/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import jwtConfig from '../../../../configs/jwt';
import { IRoleSchema } from '../../infra/mongoose/schemas/Role';
import { ServerError } from '../../../../infra/errors/ServerError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async run({ email, password }: IRequest): Promise<IResponse> {
    try {
      const existentUser = await this.usersRepository.findByEmail(email);

      if (!existentUser) {
        throw new UnauthozitedError('Crendeciais inválidas', 'auth_error');
      }

      const passwordIsValid = await this.hashProvider.compare(
        password,
        existentUser.password,
      );

      if (!passwordIsValid) {
        throw new UnauthozitedError('Crendeciais inválidas', 'auth_error');
      }

      const role = existentUser.role as unknown as IRoleSchema;

      const subject = JSON.stringify({
        id: existentUser._id,
        role: role.slug,
      });

      const token = sign({}, String(jwtConfig.secret), {
        subject,
        expiresIn: jwtConfig.expiresIn,
      });

      return {
        token,
        user: {
          name: existentUser.name,
          email: existentUser.email,
          avatar: existentUser.avatar || String(process.env.AVATAR_URL),
        },
      };
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
