import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '../../../../infra/errors/NotFoundError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

interface IResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async run({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.id,
    };
  }
}
