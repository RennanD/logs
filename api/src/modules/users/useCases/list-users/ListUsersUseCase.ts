import { inject, injectable } from 'tsyringe';
import { IUserSchema } from '../../infra/mongoose/schemas/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  search?: string;
  limit?: string;
  page?: string;
}

interface IResponse {
  result: IUserSchema[];
  total_users: number;
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async run({
    search,
    limit = '10',
    page = '1',
  }: IRequest): Promise<IResponse> {
    const offset = (Number(page) - 1) * Number(limit);

    const users = await this.usersRepository.findAll({
      search,
      limit: Number(limit),
      offset,
    });

    const total_users = await this.usersRepository.countAll(search);

    return {
      result: users,
      total_users,
    };
  }
}
