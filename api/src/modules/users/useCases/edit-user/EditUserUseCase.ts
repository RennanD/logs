import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '../../../../infra/errors/NotFoundError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  role: string;
}

@injectable()
export class EditUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async run({ name, role, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    Object.assign(user, { name, role });

    await this.usersRepository.save(user);
  }
}
