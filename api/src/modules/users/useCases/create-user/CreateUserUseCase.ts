import { inject, injectable } from 'tsyringe';
import { BadRequestError } from '../../../../infra/errors/BadRequestError';
import { NotFoundError } from '../../../../infra/errors/NotFoundError';
import { IHashProvider } from '../../../../infra/providers/IHashProvider';
import { IRolesRepository } from '../../repositories/IRolesRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async run({ name, email, password, role, avatar }: IRequest): Promise<void> {
    const existentUser = await this.userRepository.findByEmail(email);

    if (existentUser) {
      throw new BadRequestError('Este usuário já existe');
    }

    const existentRole = await this.rolesRepository.findById(role);

    if (!existentRole) {
      throw new NotFoundError('Esse perfil não existe');
    }

    const hashedPassword = await this.hashProvider.hash(password, 16);

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      avatar,
    });
  }
}
