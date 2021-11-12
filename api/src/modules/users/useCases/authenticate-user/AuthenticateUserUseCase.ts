import { inject, injectable } from 'tsyringe';

import { sign } from 'jsonwebtoken';

import { UnauthozitedError } from '../../../../infra/errors/UnauthozitedError';

import { IHashProvider } from '../../../../infra/providers/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import jwtConfig from '../../../../configs/jwt';
import { IRolesRepository } from '../../repositories/IRolesRepository';

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
    role: {
      title: string;
      slug: string;
      permissions: string[];
    };
  };
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async run({ email, password }: IRequest): Promise<IResponse> {
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

    const role = await this.rolesRepository.findById(existentUser.role._id);

    const rolePermissions = role?.permissions.map(
      permission => permission.slug,
    );

    const subject = JSON.stringify({
      user_id: existentUser._id,
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
        role: {
          title: role!.title,
          slug: role!.slug,
          permissions: rolePermissions!,
        },
      },
    };
  }
}
